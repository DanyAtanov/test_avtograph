import './global/objectFitImages';
import './global/lazy';
import './global/base';

// import './global/magnet';

// VENDORS
// import './import/jquery.nicescroll.min';

// CORE
// import '../../components/ui/form/form';

let loading = () => {
	import(/* webpackChunkName: "components" */ './components').then(() => {});
};

if (window.addEventListener) window.addEventListener('load', loading, false);
else if (window.attachEvent) window.attachEvent('onload', loading);
else window.onload = loading;
