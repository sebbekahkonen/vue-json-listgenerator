# Vue JSON list generator
![](https://raw.githubusercontent.com/sebbekahkonen/vue-json-listgenerator/master/src/assets/vueSchemaJSON.png)
  
&nbsp;

## Required
* Vue
* Vuetify
  
  &nbsp;

## Installation
```shell
npm i vue-json-listgenerator
```
&nbsp;  

## Usage
```html
<template>
	<v-app>
		<v-main>
			<vue-schema-list-generator :schema="schema" /> <!--This component takes schema as prop which is an object -->
			<vue-data-list-generator :schema="schema" :data="data" /> <!--This component takes both schema and data as props, which are both objects -->
		</v-main>
	</v-app>
</template>

<script>
import {VueSchemaListGenerator, VueDataListGenerator} from 'vue-json-listgenerator';

export default {
	name: 'App',

	components: {
		VueSchemaListGenerator,
		VueDataListGenerator
	},

	data: () => ({
		data: {
			'productId': 1,
			'productName': 'An ice sculpture',
			'price': 12.50,
			'tags': [ 'cold', 'ice' ],
			'dimensions': {
				'length': 7.0,
				'width': 12.0,
				'height': 9.5
			},
			'warehouseLocation': {
				'latitude': -78.75,
				'longitude': 20.4
			}
		},
		schema: {
			$schema: 'https://json-schema.org/draft/2020-12/schema',
			$id: 'https://example.com/product.schema.json',
			title: 'Product',
			description: 'Example product',
			type: 'object',
			properties: {
				productId: {
					description: 'The unique identifier for a product',
					type: 'integer'
				},
				productName: {
					description: 'Name of the product',
					type: 'string'
				},
				price: {
					description: 'The price of the product',
					type: 'number',
					exclusiveMinimum: 0
				},
				tags: {
					description: 'Tags for the product',
					type: 'array',
					items: {
						type: 'string'
					},
					minItems: 1,
					uniqueItems: true
				},
				dimensions: {
					type: 'object',
					properties: {
						length: {
							type: 'number'
						},
						width: {
							type: 'number'
						},
						height: {
							type: 'number'
						}
					},
					required: [
						'length',
						'width',
						'height'
					]
				},
				warehouseLocation: {
					description: 'Coordinates of the warehouse where the product is located.',
					$ref: 'https://example.com/geographical-location.schema.json'
				}
			},
			required: [
				'productId',
				'productName',
				'price'
			]
		}

	}),
	methods: {
		onSubmit(formData) {
			console.log(formData);
		}
	}
};
</script>
```