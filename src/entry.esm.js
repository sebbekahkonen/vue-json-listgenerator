
// import * as components from './components/index';

// // install function executed by Vue.use()
// const install = function installVueListGenerator(Vue) {
// 	Object.entries(components).forEach(([componentName, component]) => {
// 		Vue.component(componentName, component);
// 	});
// };


// // Create module definition for Vue.use()
// export default install;

// // To allow individual component use, export components
// // each can be registered via Vue.component()
// export * from './components/index';




// Import vue component
// import component from './vue-json-listgenerator.vue';
import * as components from './components/index';
// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;

	install.installed = true;
	Object.entries(components).forEach(([componentName, component]) => {
		Vue.component(componentName, component);
	});
}

// Create module definition for Vue.use()
const plugin = {
	install
};
// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export * from './components/index';