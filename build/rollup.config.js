import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import vuetify from 'rollup-plugin-vuetify';

export default {
	external: ['VJsf', 'vuetify', 'components/index'],
	input: 'src/entry.esm.js', // Path relative to package.json
	output: {
		name: 'VueJsonListgenerator',
		exports: 'named',
		external: ['vuetify', 'VJsf'],
		globals: {
			'vuetify': 'Vuetify',
			'VJsf': 'VJsf',
			'components/index': 'components'
		}
	},
	plugins: [
		commonjs(),
		vuetify(),
		vue({
			css: true, // Dynamically inject css as a <style> tag
			compileTemplate: true // Explicitly convert template to render function
		}),
		buble({ exclude: 'node_modules/**' }) // Transpile to ES5
	]
};