'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import yaml from 'js-yaml';
import fs from 'fs';
import webpackStream from 'webpack-stream';
import webpack2 from 'webpack';
import named from 'vinyl-named';
import uncss from 'uncss';
import autoprefixer from 'autoprefixer';

const path = require('path');

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!yargs.argv.production;

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
	let ymlFile = fs.readFileSync('config.yml', 'utf8');
	return yaml.load(ymlFile);
}

gulp.task('svgSpriteBuild', gulp.series(svgSprite, svgSpriteHTML));

// Build the "dist" folder by running all of the below tasks
// Sass must be run later so UnCSS can search for used classes in the others assets.
gulp.task(
	'build',
	gulp.series(
		clean,
		gulp.parallel(pages, javascript, 'svgSpriteBuild', images, copy),
		sass
	)
);

// Build the site, run the server, and watch for file changes
gulp.task('default', gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
	rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
function copy() {
	return gulp.src(PATHS.assets).pipe(gulp.dest(PATHS.dist + '/assets'));
}

// Copy page templates into finished HTML files
function pages() {
	return gulp
		.src('src/pages/**/*.{html,hbs,handlebars}')
		.pipe(
			panini({
				root: 'src/pages/',
				layouts: 'src/layouts/',
				partials: 'src/components/',
				data: 'src/data/',
				helpers: 'src/helpers/',
			})
		)
		.pipe(
			$.htmlBeautify({
				indent_with_tabs: true,
				indent_size: 4,
				max_preserve_newlines: 0,
				end_with_newline: true,
				extra_liners: [],
			})
		)
		.pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
	panini.refresh();
	done();
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
	const postCssPlugins = [
		// Autoprefixer
		autoprefixer({ overrideBrowserslist: COMPATIBILITY }),

		// UnCSS - Uncomment to remove unused styles in production
		// PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),
	].filter(Boolean);

	return gulp
		.src('src/assets/styles/app.scss')
		.pipe($.sourcemaps.init())
		.pipe(
			$.sass({
				includePaths: PATHS.sass,
			}).on('error', $.sass.logError)
		)
		.pipe($.postcss(postCssPlugins))
		.pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
		.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
		.pipe(gulp.dest(PATHS.dist + '/assets/styles'))
		.pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
	mode: PRODUCTION ? 'production' : 'development',
	output: {
		publicPath: './assets/javascript/',
		path: path.resolve(__dirname, './public/assets/javascript'),
		chunkFilename: '[name].[contenthash].js',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](jquery|js-cookie|lodash\/throttle|lodash\/debounce)[\\/]/,
					filename: 'vendor.js',
					chunks: 'all',
				},
			},
			// name: 'libs',
			// chunks: 'all',
		},
	},
	plugins: [
		new webpack2.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Cookies: 'js-cookie',
			_throttle: 'lodash/throttle',
			_debounce: 'lodash/debounce',
			gsap: ['gsap', 'default'],
			Swiper: ['swiper/bundle', 'default'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules[\/\\](?!(swiper|dom7|jquery-expander)[\/\\])/],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-syntax-dynamic-import'],
						compact: false,
					},
				},
			},
		],
	},
	// externals: {
	// 	jquery: 'jQuery',
	// },
	devtool: !PRODUCTION && 'source-map',
};

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
	return gulp
		.src(PATHS.entries)
		.pipe(named())
		.pipe($.sourcemaps.init())
		.pipe(webpackStream(webpackConfig, webpack2))
		.pipe(
			$.if(
				PRODUCTION,
				$.uglify().on('error', (e) => {
					console.log(e);
				})
			)
		)
		.pipe($.if(!PRODUCTION, $.sourcemaps.write()))
		.pipe(gulp.dest(PATHS.dist + '/assets/javascript'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
	return gulp
		.src('src/assets/images/**/*')
		.pipe(
			$.if(
				PRODUCTION,
				$.imagemin([$.imagemin.jpegtran({ progressive: true })])
			)
		)
		.pipe(gulp.dest(PATHS.dist + '/assets/images'));
}

// SVG Sprite Build
function svgSprite() {
	return gulp
		.src('src/assets/images/svg/*.svg') // svg files for sprite
		.pipe(
			$.svgSprite({
				mode: {
					symbol: {
						sprite: '../sprite.svg', //sprite file name
					},
				},
			})
		)
		.pipe(gulp.dest(PATHS.dist + '/assets/images/'));
}

// SVG Sprite Build HTML
function svgSpriteHTML() {
	return gulp
		.src('src/assets/images/svg/*.svg') // svg files for sprite
		.pipe(
			$.svgSprite({
				mode: {
					symbol: {
						sprite: '../sprite-bundle.html', //sprite file name
					},
				},
			})
		)
		.pipe(gulp.dest('src/components/core/sprite/'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
	browser.init(
		{
			server: PATHS.dist,
			port: PORT,
		},
		done
	);
}

// Reload the browser with BrowserSync
function reload(done) {
	browser.reload();
	done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
	gulp.watch(PATHS.assets, copy);
	gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, reload));
	gulp.watch('src/{layouts,components}/**/*.html').on(
		'all',
		gulp.series(resetPages, pages, reload)
	);
	gulp.watch('src/data/**/*.{js,json,yml}').on(
		'all',
		gulp.series(resetPages, pages, reload)
	);
	gulp.watch('src/helpers/**/*.js').on(
		'all',
		gulp.series(resetPages, pages, reload)
	);
	gulp.watch('src/assets/styles/**/*.scss').on('all', sass);
	gulp.watch('src/{layouts,pages,components}/**/*.scss').on('all', sass);
	gulp.watch(['src/assets/javascript/**/*.js', 'src/components/**/*.js']).on(
		'all',
		gulp.series(javascript, reload)
	);
	gulp.watch('src/assets/images/**/*').on('all', gulp.series(images, reload));
}
