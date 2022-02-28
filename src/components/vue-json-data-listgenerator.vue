<template>
	<div>
		<v-form ref="form" class="pa-2">
			<v-jsf v-model="model" :schema="schema" :data="data" />
		</v-form>
		<v-col class="text-right">
			<v-btn class="mr-10" width="100" color="primary" title="test" @click="onSubmit">{{ buttonText }}</v-btn>
		</v-col>
		<v-col class="text-right" />
	</div>
</template>
<script>
import VJsf from '@koumoul/vjsf/lib/VJsf.js';
import '@koumoul/vjsf/lib/VJsf.css';
import '@koumoul/vjsf/lib/deps/third-party.js';
export default {
	components: { VJsf },
	props: {
		data: {
			type: Object,
			default: null
		},
		buttonText: {
			type: String,
			default: 'Submit'
		}
	},
	data: () => ({
		model: {},
		schema: {
			properties: {

			}
		},
		schemaData: ''
	}),
	created() {
		this.schemaData = '{';
		Object.keys(this.data).forEach(name => {
			this.schemaData += `"${name}": { "type": "${typeof(this.data[name])}"}, `
		});
		this.schemaData = this.schemaData.replace(/,\s*$/, '');
		this.schemaData += '}'
		this.schema.properties = JSON.parse(this.schemaData);
		this.model = this.data;
	},
	methods: {
		onSubmit() {
			this.$emit('on-submit', this.model);
		}
	}
};
</script>
<style scoped>
	
</style>