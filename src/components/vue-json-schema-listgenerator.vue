<template>
	<div>
		<v-form ref="form" class="pa-2">
			<v-jsf v-model="model" :schema="schema" />
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
		schema: {
			type: Object,
			default: null
		},
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
		model: {}
	}),
	created() {
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