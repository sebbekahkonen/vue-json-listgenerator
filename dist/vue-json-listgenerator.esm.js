import { VForm, VBtn, VCol } from 'vuetify/lib';
import VJsf from '@koumoul/vjsf/lib/VJsf.js';
import '@koumoul/vjsf/lib/VJsf.css';
import '@koumoul/vjsf/lib/deps/third-party.js';

var script = {
	components: {
        VJsf: VJsf,
        VForm: VForm,
        VBtn: VBtn,
        VCol: VCol
    },
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
	data: function () { return ({
		model: {},
		schema: {
			properties: {

			}
		},
		schemaData: ''
	}); },
	created: function created() {
		var this$1 = this;

		this.schemaData = '{';
		Object.keys(this.data).forEach(function (name) {
			this$1.schemaData += "\"" + name + "\": { \"type\": \"" + (typeof(this$1.data[name])) + "\"}, ";
		});
		this.schemaData = this.schemaData.replace(/,\s*$/, '');
		this.schemaData += '}';
		this.schema.properties = JSON.parse(this.schemaData);
		this.model = this.data;
	},
	methods: {
		onSubmit: function onSubmit() {
			this.$emit('on-submit', this.model);
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-form",
        { ref: "form", staticClass: "pa-2" },
        [
          _c("v-jsf", {
            attrs: { schema: _vm.schema, data: _vm.data },
            model: {
              value: _vm.model,
              callback: function ($$v) {
                _vm.model = $$v;
              },
              expression: "model",
            },
          }) ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-col",
        { staticClass: "text-right" },
        [
          _c(
            "v-btn",
            {
              staticClass: "mr-10",
              attrs: { width: "100", color: "primary", title: "test" },
              on: { click: _vm.onSubmit },
            },
            [_vm._v(_vm._s(_vm.buttonText))]
          ) ],
        1
      ),
      _vm._v(" "),
      _c("v-col", { staticClass: "text-right" }) ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-c5c0e9c4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"vue-json-data-listgenerator.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-c5c0e9c4";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var script$1 = {
	components: {
        VJsf: VJsf,
        VForm: VForm,
        VBtn: VBtn,
        VCol: VCol
    },
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
	data: function () { return ({
		model: {}
	}); },
	created: function created() {
		this.model = this.data;
	},
	methods: {
		onSubmit: function onSubmit() {
			this.$emit('on-submit', this.model);
		}
	}
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-form",
        { ref: "form", staticClass: "pa-2" },
        [
          _c("v-jsf", {
            attrs: { schema: _vm.schema },
            model: {
              value: _vm.model,
              callback: function ($$v) {
                _vm.model = $$v;
              },
              expression: "model",
            },
          }) ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-col",
        { staticClass: "text-right" },
        [
          _c(
            "v-btn",
            {
              staticClass: "mr-10",
              attrs: { width: "100", color: "primary", title: "test" },
              on: { click: _vm.onSubmit },
            },
            [_vm._v(_vm._s(_vm.buttonText))]
          ) ],
        1
      ),
      _vm._v(" "),
      _c("v-col", { staticClass: "text-right" }) ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-4e7f1128_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"vue-json-schema-listgenerator.vue"}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-4e7f1128";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
	__proto__: null,
	VueDataListGenerator: __vue_component__,
	VueSchemaListGenerator: __vue_component__$1
});

// Import vue component
// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }

	install.installed = true;
	Object.entries(components).forEach(function (ref) {
		var componentName = ref[0];
		var component = ref[1];

		Vue.component(componentName, component);
	});
}

// Create module definition for Vue.use()
var plugin = {
	install: install
};
// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

export { __vue_component__ as VueDataListGenerator, __vue_component__$1 as VueSchemaListGenerator, install };
