(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{575:function(e,t,n){"use strict";!function(a){var d=n(572);!function(){var t,n=document.querySelector(".modal-content"),o=a(n);document.documentElement.style.setProperty("--scrollbar-width",window.innerWidth-document.documentElement.clientWidth+"px");function s(){$body.addClass("modal_open"),Object(d.b)(n)}function c(e){e?a.ajax({url:"/modals/"+e+"-modal.html",cache:!1}).done(function(e){o.append(e),s()}):s()}function i(){var e=o.children();$body.addClass("modal_closing"),setTimeout(function(){$body.removeClassWild("modal_*"),e&&e.remove(),Object(d.c)(n)},250),t=""}return{init:function(){0!==o.length&&($document.on("click","[data-modal]",function(e){e.preventDefault();e=a(this);t=e.data("modal"),c(t)}),a(document).on("keydown",function(e){"Escape"!==e.key&&27!==e.keyCode||i()}),o.on("click",function(e){a(e.target).is(a(this))&&i()}),o.on("click, click.manual","[data-modal-close]",function(){i()}))},open:c}}().init()}.call(this,n(103))},576:function(e,t){var n=document.querySelectorAll(".button.product-card__action");n.length&&n.forEach(function(e,t){e.addEventListener("click",function(){e.classList.add("loading"),setTimeout(function(){e.classList.remove("loading")},1e3)})})},577:function(e,t){var s=document.querySelectorAll(".counter");s.length&&s.forEach(function(e,n){var o=1;e.addEventListener("click",function(e){var t=s[n].querySelector(".counter__result");e.target.closest(".counter__minus")?1<o&&o--:e.target.closest(".counter__plus")&&o++,0!==o&&(t.innerHTML=o)})})},581:function(e,t,n){"use strict";n.r(t),n(575),n(576),n(577);var o,s,c,i,a,d,l,r,u,m,p,_=n(572),t=(o=document.querySelector(".burger"),s=document.querySelector(".header__content-wrapper"),c=document.querySelector(".header__action-catalog"),i=document.querySelector(".menu-catalog__head"),a=document.querySelector(".menu-catalog"),d=document.querySelector(".header__basket"),l=document.querySelector(".basket__close"),r=document.querySelector(".header__basket--mobile"),u=document.querySelector(".basket"),m=function(){var e=document.querySelector("body.menu_open");e&&(e.addEventListener("click",function(e){e.target.closest("header")||e.target.closest(".menu-catalog")||e.target.closest(".basket")||p()}),e.addEventListener("keydown",function(e){"Escape"!==e.key&&27!==e.keyCode||p()},{once:!0}),l.addEventListener("click",function(){p()}))},p=function(){s.classList.remove("_is-open"),a.classList.remove("_is-open"),u.classList.remove("_is-open"),document.body.classList.remove("menu_open"),Object(_.a)()},t=function(){window.addEventListener("resize",function(){p()})},o&&(o.addEventListener("click",function(){s.classList.toggle("_is-open"),document.body.classList.toggle("menu_open"),s.classList.contains("_is-open")?Object(_.a)():(Object(_.c)(s),a.classList.remove("_is-open"))}),c.addEventListener("click",function(){a.classList.toggle("_is-open"),a.classList.contains("_is-open")?(Object(_.a)(),document.body.classList.add("menu_open")):Object(_.c)(a),setTimeout(function(){m()},0)}),i.addEventListener("click",function(){s.classList.contains("_is-open")?a.classList.remove("_is-open"):p()}),d.addEventListener("click",function(){u.classList.toggle("_is-open"),u.classList.contains("_is-open")?(Object(_.a)(),document.body.classList.add("menu_open")):Object(_.c)(u),setTimeout(function(){m()},0)}),r.addEventListener("click",function(){u.classList.toggle("_is-open"),u.classList.contains("_is-open")?(Object(_.a)(),document.body.classList.add("menu_open")):Object(_.c)(u),setTimeout(function(){m()},0)}),t()),n(574)),n=n(573);document.querySelector(".brands-section")&&new t.a(".brands-section__slider",{modules:[n.b,n.a],loop:!0,slidesPerView:"auto",observer:!0,speed:1200,longSwipesRatio:.3,watchSlidesProgress:!0,watchOverflow:!0,navigation:{nextEl:".brands-section__slider-nav.swiper-button-next",prevEl:".brands-section__slider-nav.swiper-button-prev"},on:{init:function(){this.el.classList.add("_is-loaded")}},breakpoints:{320:{centeredSlides:!1,spaceBetween:26,freeMode:{enabled:!0,sticky:!1}},768:{centeredSlides:!0,freeMode:{enabled:!1}},1280:{allowTouchMove:!1}}}),document.querySelector(".new-products-section")&&new t.a(".new-products-section__slider",{modules:[n.b],loop:!0,observer:!0,speed:1e3,longSwipesRatio:.3,centeredSlides:!1,watchSlidesProgress:!0,watchOverflow:!0,navigation:{nextEl:".new-products-section__slider-nav.swiper-button-next",prevEl:".new-products-section__slider-nav.swiper-button-prev"},on:{init:function(){this.el.classList.add("_is-loaded")}},breakpoints:{320:{slidesPerView:2,spaceBetween:12},375:{slidesPerView:2,spaceBetween:19},768:{spaceBetween:24,slidesPerView:3},1024:{spaceBetween:32,slidesPerView:4}}}),console.log("components are loaded")}}]);