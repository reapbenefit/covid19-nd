"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.flags");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaTextMask = require("vanilla-text-mask");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _tooltip = _interopRequireDefault(require("tooltip.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _ismobilejs = _interopRequireDefault(require("ismobilejs"));

var _Formio = _interopRequireDefault(require("../../../Formio"));

var FormioUtils = _interopRequireWildcard(require("../../../utils/utils"));

var _Validator = _interopRequireDefault(require("../../../validator/Validator"));

var _Templates = _interopRequireDefault(require("../../../templates/Templates"));

var _Element2 = _interopRequireDefault(require("../../../Element"));

var _ComponentModal = _interopRequireDefault(require("../componentModal/ComponentModal"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CKEDITOR = 'https://cdn.form.io/ckeditor/16.0.0/ckeditor.js';
var QUILL_URL = 'https://cdn.form.io/quill/1.3.7';
var ACE_URL = 'https://cdn.form.io/ace/1.4.8/ace.js';
var TINYMCE_URL = 'https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js';
/**
 * This is the Component class
 which all elements within the FormioForm derive from.
 */

var Component = /*#__PURE__*/function (_Element) {
  _inherits(Component, _Element);

  var _super = _createSuper(Component);

  _createClass(Component, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      return _lodash.default.merge.apply(_lodash.default, [{
        /**
         * Determines if this component provides an input.
         */
        input: true,

        /**
         * The data key for this component (how the data is stored in the database).
         */
        key: '',

        /**
         * The input placeholder for this component.
         */
        placeholder: '',

        /**
         * The input prefix
         */
        prefix: '',

        /**
         * The custom CSS class to provide to this component.
         */
        customClass: '',

        /**
         * The input suffix.
         */
        suffix: '',

        /**
         * If this component should allow an array of values to be captured.
         */
        multiple: false,

        /**
         * The default value of this compoennt.
         */
        defaultValue: null,

        /**
         * If the data of this component should be protected (no GET api requests can see the data)
         */
        protected: false,

        /**
         * Validate if the value of this component should be unique within the form.
         */
        unique: false,

        /**
         * If the value of this component should be persisted within the backend api database.
         */
        persistent: true,

        /**
         * Determines if the component should be within the form, but not visible.
         */
        hidden: false,

        /**
         * If the component should be cleared when hidden.
         */
        clearOnHide: true,

        /**
         * This will refresh this component options when this field changes.
         */
        refreshOn: '',

        /**
         * This will redraw the component when this field changes.
         */
        redrawOn: '',

        /**
         * If this component should be included as a column within a submission table.
         */
        tableView: false,

        /**
         * If this component should be rendering in modal.
         */
        modalEdit: false,

        /**
         * The input label provided to this component.
         */
        label: '',
        labelPosition: 'top',
        description: '',
        errorLabel: '',
        tooltip: '',
        hideLabel: false,
        tabindex: '',
        disabled: false,
        autofocus: false,
        dbIndex: false,
        customDefaultValue: '',
        calculateValue: '',
        widget: null,

        /**
         * Attributes that will be assigned to the input elements of this component.
         */
        attributes: {},

        /**
         * This will perform the validation on either "change" or "blur" of the input element.
         */
        validateOn: 'change',

        /**
         * The validation criteria for this component.
         */
        validate: {
          /**
           * If this component is required.
           */
          required: false,

          /**
           * Custom JavaScript validation.
           */
          custom: '',

          /**
           * If the custom validation should remain private (only the backend will see it and execute it).
           */
          customPrivate: false,

          /**
           * If this component should implement a strict date validation if the Calendar widget is implemented.
           */
          strictDateValidation: false,
          multiple: false,
          unique: false
        },

        /**
         * The simple conditional settings for a component.
         */
        conditional: {
          show: null,
          when: null,
          eq: ''
        },
        overlay: {
          style: '',
          left: '',
          top: '',
          width: '',
          height: ''
        },
        allowCalculateOverride: false,
        encrypted: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false
      }].concat(sources));
    }
    /**
     * Provides a table view for this component. Override if you wish to do something different than using getView
     * method of your instance.
     *
     * @param value
     * @param options
     */

    /* eslint-disable no-unused-vars */

  }, {
    key: "tableView",
    value: function tableView(value, options) {}
    /* eslint-enable no-unused-vars */

    /**
     * Initialize a new Component.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */

    /* eslint-disable max-statements */

  }]);

  function Component(component, options, data) {
    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this, Object.assign({
      renderMode: 'form',
      attachMode: 'full'
    }, options || {})); // Restore the component id.

    if (component && component.id) {
      _this.id = component.id;
    }
    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */


    _this._hasCondition = null;
    /**
     * References to dom elements
     */

    _this.refs = {}; // Allow global override for any component JSON.

    if (component && _this.options.components && _this.options.components[component.type]) {
      _lodash.default.merge(component, _this.options.components[component.type]);
    }
    /**
     * Set the validator instance.
     */


    _this.validator = _Validator.default;
    /**
     * The data path to this specific component instance.
     *
     * @type {string}
     */

    _this.path = '';
    /**
     * The Form.io component JSON schema.
     * @type {*}
     */

    _this.component = _this.mergeSchema(component || {}); // Save off the original component to be used in logic.

    _this.originalComponent = (0, FormioUtils.fastCloneDeep)(_this.component);
    /**
     * If the component has been attached
     */

    _this.attached = false;
    /**
     * If the component has been rendered
     */

    _this.rendered = false;
    /**
     * The data object in which this component resides.
     * @type {*}
     */

    _this._data = data || {}; // Add the id to the component.

    _this.component.id = _this.id;
    /**
     * The existing error that this component has.
     * @type {string}
     */

    _this.error = '';
    /**
     * Tool tip text after processing
     * @type {string}
     */

    _this.tooltip = '';
    /**
     * The row path of this component.
     * @type {number}
     */

    _this.row = _this.options.row;
    /**
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */

    _this._disabled = (0, FormioUtils.boolValue)(_this.component.disabled) ? _this.component.disabled : false;
    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {Component}
     */

    _this.root = _this.options.root;
    /**
     * Determines if this component is visible, or not.
     */

    _this._parentVisible = _this.options.hasOwnProperty('parentVisible') ? _this.options.parentVisible : true;
    _this._visible = _this._parentVisible && _this.conditionallyVisible(null, data);
    _this._parentDisabled = false;
    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */

    _this.pristine = true;
    /**
     * Points to the parent component.
     *
     * @type {Component}
     */

    _this.parent = _this.options.parent;
    _this.options.name = _this.options.name || 'data';
    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */

    _this.validators = ['required', 'minLength', 'maxLength', 'minWords', 'maxWords', 'custom', 'pattern', 'json', 'mask'];
    _this._path = '';
    /**
     * Used to trigger a new change in this component.
     * @type {function} - Call to trigger a change in this component.
     */

    var lastChanged = null;
    var triggerArgs = [];

    var _triggerChange = _lodash.default.debounce(function () {
      var _this2;

      if (_this.root) {
        _this.root.changing = false;
      }

      triggerArgs = [];

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!args[1] && lastChanged) {
        // Set the changed component if one isn't provided.
        args[1] = lastChanged;
      }

      if (_lodash.default.isEmpty(args[0]) && lastChanged) {
        // Set the flags if it is empty and lastChanged exists.
        args[0] = lastChanged.flags;
      }

      lastChanged = null;
      return (_this2 = _this).onChange.apply(_this2, args);
    }, 100);

    _this.triggerChange = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args[1]) {
        // Make sure that during the debounce that we always track lastChanged component, even if they
        // don't provide one later.
        lastChanged = args[1];
      }

      if (_this.root) {
        _this.root.changing = true;
      }

      if (args.length) {
        triggerArgs = args;
      }

      return _triggerChange.apply(void 0, _toConsumableArray(triggerArgs));
    };
    /**
     * Used to trigger a redraw event within this component.
     *
     * @type {Function}
     */


    _this.triggerRedraw = _lodash.default.debounce(_this.redraw.bind(_assertThisInitialized(_this)), 100);
    /**
     * list of attached tooltips
     * @type {Array}
     */

    _this.tooltips = []; // To force this component to be invalid.

    _this.invalid = false;

    if (_this.component) {
      _this.type = _this.component.type;

      if (_this.allowData && _this.key) {
        _this.options.name += "[".concat(_this.key, "]"); // If component is visible or not set to clear on hide, set the default value.

        if (_this.visible || !_this.component.clearOnHide) {
          if (!_this.hasValue()) {
            _this.dataValue = _this.defaultValue;
          } else {
            // Ensure the dataValue is set.

            /* eslint-disable  no-self-assign */
            _this.dataValue = _this.dataValue;
            /* eslint-enable  no-self-assign */
          }
        }
      }
      /**
       * The element information for creating the input element.
       * @type {*}
       */


      _this.info = _this.elementInfo();
    } // Allow anyone to hook into the component creation.


    _this.hook('component');

    if (!_this.options.skipInit) {
      _this.init();
    }

    return _this;
  }
  /* eslint-enable max-statements */


  _createClass(Component, [{
    key: "mergeSchema",
    value: function mergeSchema() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _lodash.default.defaultsDeep(component, this.defaultSchema);
    } // Allow componets to notify when ready.

  }, {
    key: "init",
    value: function init() {
      this.disabled = this.shouldDisabled;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Component.prototype), "destroy", this).call(this);

      this.detach();
    }
  }, {
    key: "rightDirection",
    value: function rightDirection(direction) {
      return direction === 'right';
    }
  }, {
    key: "getLabelInfo",
    value: function getLabelInfo() {
      var isRightPosition = this.rightDirection(this.labelPositions[0]);
      var isRightAlign = this.rightDirection(this.labelPositions[1]);
      var labelStyles = "\n      flex: ".concat(this.labelWidth, ";\n      ").concat(isRightPosition ? 'margin-left' : 'margin-right', ":").concat(this.labelMargin, "%;\n    ");
      var contentStyles = "\n      flex: ".concat(100 - this.labelWidth - this.labelMargin, ";\n    ");
      return {
        isRightPosition: isRightPosition,
        isRightAlign: isRightAlign,
        labelStyles: labelStyles,
        contentStyles: contentStyles
      };
    }
    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */

  }, {
    key: "getModifiedSchema",
    value: function getModifiedSchema(schema, defaultSchema, recursion) {
      var _this3 = this;

      var modified = {};

      if (!defaultSchema) {
        return schema;
      }

      _lodash.default.each(schema, function (val, key) {
        if (!_lodash.default.isArray(val) && _lodash.default.isObject(val) && defaultSchema.hasOwnProperty(key)) {
          var subModified = _this3.getModifiedSchema(val, defaultSchema[key], true);

          if (!_lodash.default.isEmpty(subModified)) {
            modified[key] = subModified;
          }
        } else if (_lodash.default.isArray(val)) {
          if (val.length !== 0) {
            modified[key] = val;
          }
        } else if (!recursion && key === 'type' || !recursion && key === 'key' || !recursion && key === 'label' || !recursion && key === 'input' || !recursion && key === 'tableView' || val !== '' && !defaultSchema.hasOwnProperty(key) || val !== '' && val !== defaultSchema[key]) {
          modified[key] = val;
        }
      });

      return modified;
    }
    /**
     * Returns the JSON schema for this component.
     */

  }, {
    key: "t",

    /**
     * Translate a text using the i18n system.
     *
     * @param {string} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    value: function t(text, params) {
      if (!text) {
        return '';
      }

      params = params || {};
      params.data = this.rootValue;
      params.row = this.data;
      params.component = this.component;
      params.nsSeparator = '::';
      params.keySeparator = '.|.';
      params.pluralSeparator = '._.';
      params.contextSeparator = '._.';
      var translated = this.i18next.t(text, params);
      return translated || text;
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return !this.component.label || !this.inDataGrid && this.component.hideLabel || this.inDataGrid && !this.component.dataGridLabel || this.options.inputsOnly;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(names, modes) {
      modes = Array.isArray(modes) ? modes : [modes];
      names = Array.isArray(names) ? names : [names];

      if (!modes.includes('form')) {
        modes.push('form');
      }

      var result = null;

      if (this.options.templates) {
        result = this.checkTemplate(this.options.templates, names, modes);

        if (result) {
          return result;
        }
      }

      var frameworkTemplates = this.options.template ? _Templates.default.templates[this.options.template] : _Templates.default.current;
      result = this.checkTemplate(frameworkTemplates, names, modes);

      if (result) {
        return result;
      } // Default back to bootstrap if not defined.


      var name = names[names.length - 1];
      var templatesByName = _Templates.default.defaultTemplates[name];

      if (!templatesByName) {
        return "Unknown template: ".concat(name);
      }

      var templateByMode = this.checkTemplateMode(templatesByName, modes);

      if (templateByMode) {
        return templateByMode;
      }

      return templatesByName.form;
    }
  }, {
    key: "checkTemplate",
    value: function checkTemplate(templates, names, modes) {
      var _iterator = _createForOfIteratorHelper(names),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;
          var templatesByName = templates[name];

          if (templatesByName) {
            var templateByMode = this.checkTemplateMode(templatesByName, modes);

            if (templateByMode) {
              return templateByMode;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }, {
    key: "checkTemplateMode",
    value: function checkTemplateMode(templatesByName, modes) {
      var _iterator2 = _createForOfIteratorHelper(modes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mode = _step2.value;
          var templateByMode = templatesByName[mode];

          if (templateByMode) {
            return templateByMode;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return null;
    }
  }, {
    key: "renderTemplate",
    value: function renderTemplate(name) {
      var _this4 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var modeOption = arguments.length > 2 ? arguments[2] : undefined;
      // Need to make this fall back to form if renderMode is not found similar to how we search templates.
      var mode = modeOption || this.options.renderMode || 'form';
      data.component = this.component;
      data.self = this;
      data.options = this.options;
      data.readOnly = this.options.readOnly;
      data.iconClass = this.iconClass.bind(this);
      data.size = this.size.bind(this);
      data.t = this.t.bind(this);
      data.transform = this.transform;
      data.id = data.id || this.id;
      data.key = data.key || this.key;
      data.value = data.value || this.dataValue;
      data.disabled = this.disabled;
      data.builder = this.builderMode;

      data.render = function () {
        console.warn("Form.io 'render' template function is deprecated.\n      If you need to render template (template A) inside of another template (template B),\n      pass pre-compiled template A (use this.renderTemplate('template_A_name') as template context variable for template B");
        return _this4.renderTemplate.apply(_this4, arguments);
      };

      data.label = this.labelInfo;
      data.tooltip = this.interpolate(this.component.tooltip || '').replace(/(?:\r\n|\r|\n)/g, '<br />'); // Allow more specific template names

      var names = ["".concat(name, "-").concat(this.component.type, "-").concat(this.key), "".concat(name, "-").concat(this.component.type), "".concat(name, "-").concat(this.key), "".concat(name)]; // Allow template alters.
      // console.log(`render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`, data);

      return this.hook("render".concat(name.charAt(0).toUpperCase() + name.substring(1, name.length)), this.interpolate(this.getTemplate(names, mode), data), data, mode);
    }
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */

  }, {
    key: "sanitize",
    value: function sanitize(dirty) {
      return FormioUtils.sanitize(dirty, this.options);
    }
    /**
     * Render a template string into html.
     *
     * @param template
     * @param data
     * @param actions
     *
     * @return {HTMLElement} - The created element.
     */

  }, {
    key: "renderString",
    value: function renderString(template, data) {
      if (!template) {
        return '';
      } // Interpolate the template and populate


      return this.interpolate(template, data);
    }
  }, {
    key: "performInputMapping",
    value: function performInputMapping(input) {
      return input;
    }
  }, {
    key: "getBrowserLanguage",
    value: function getBrowserLanguage() {
      var nav = window.navigator;
      var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
      var language; // support for HTML 5.1 "navigator.languages"

      if (Array.isArray(nav.languages)) {
        for (var i = 0; i < nav.languages.length; i++) {
          language = nav.languages[i];

          if (language && language.length) {
            return language.split(';')[0];
          }
        }
      } // support for other well known properties in browsers


      for (var _i = 0; _i < browserLanguagePropertyKeys.length; _i++) {
        language = nav[browserLanguagePropertyKeys[_i]];

        if (language && language.length) {
          return language.split(';')[0];
        }
      }

      return null;
    }
    /**
     * Called before a next and previous page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */

  }, {
    key: "beforePage",
    value: function beforePage() {
      return _nativePromiseOnly.default.resolve(true);
    }
  }, {
    key: "beforeNext",
    value: function beforeNext() {
      return this.beforePage(true);
    }
    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      return _nativePromiseOnly.default.resolve(true);
    }
    /**
     * Return the submission timezone.
     *
     * @return {*}
     */

  }, {
    key: "loadRefs",
    value: function loadRefs(element, refs) {
      for (var ref in refs) {
        if (refs[ref] === 'single') {
          this.refs[ref] = element.querySelector("[ref=\"".concat(ref, "\"]"));
        } else {
          this.refs[ref] = element.querySelectorAll("[ref=\"".concat(ref, "\"]"));
        }
      }
    }
  }, {
    key: "setOpenModalElement",
    value: function setOpenModalElement() {
      var template = "\n      <label class=\"control-label\">".concat(this.component.label, "</label><br>\n      <button lang='en' class='btn btn-light btn-md open-modal-button' ref='openModal'>Click to set value</button>\n    ");
      this.componentModal.setOpenModalElement(template);
    }
  }, {
    key: "getModalPreviewTemplate",
    value: function getModalPreviewTemplate() {
      return "\n      <label class=\"control-label\">".concat(this.component.label, "</label><br>\n      <button lang='en' class='btn btn-light btn-md open-modal-button' ref='openModal'>").concat(this.getValueAsString(this.dataValue), "</button>");
    }
  }, {
    key: "build",
    value: function build(element) {
      element = element || this.element;
      this.empty(element);
      this.setContent(element, this.render());
      return this.attach(element);
    }
  }, {
    key: "render",
    value: function render() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unknown component: ".concat(this.component.type);
      var topLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isVisible = this.visible;
      this.rendered = true;

      if (!this.builderMode && this.component.modalEdit) {
        return _ComponentModal.default.render(this, {
          visible: isVisible,
          id: this.id,
          classes: this.className,
          styles: this.customStyle,
          children: children
        }, topLevel);
      } else {
        return this.renderTemplate('component', {
          visible: isVisible,
          id: this.id,
          classes: this.className,
          styles: this.customStyle,
          children: children
        }, topLevel);
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

      if (!this.builderMode && this.component.modalEdit) {
        this.componentModal = new _ComponentModal.default(this, element);
        this.setOpenModalElement();
      }

      this.attached = true;
      this.element = element;
      element.component = this; // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.

      if (this.element.id) {
        this.id = this.element.id;
      }

      this.loadRefs(element, {
        messageContainer: 'single',
        tooltip: 'multiple'
      });
      this.refs.tooltip.forEach(function (tooltip, index) {
        var title = _this5.interpolate(tooltip.getAttribute('data-title') || _this5.t(_this5.component.tooltip)).replace(/(?:\r\n|\r|\n)/g, '<br />');

        _this5.tooltips[index] = new _tooltip.default(tooltip, {
          trigger: 'hover click focus',
          placement: 'right',
          html: true,
          title: title,
          template: "\n          <div class=\"tooltip\" style=\"opacity: 1;\" role=\"tooltip\">\n            <div class=\"tooltip-arrow\"></div>\n            <div class=\"tooltip-inner\"></div>\n          </div>"
        });
      }); // Attach logic.

      this.attachLogic();
      this.autofocus(); // Allow global attach.

      this.hook('attachComponent', element, this); // Allow attach per component type.

      var type = this.component.type;

      if (type) {
        this.hook("attach".concat(type.charAt(0).toUpperCase() + type.substring(1, type.length)), element, this);
      }

      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "addShortcut",
    value: function addShortcut(element, shortcut) {
      // Avoid infinite recursion.
      if (!element || !this.root || this.root === this) {
        return;
      }

      if (!shortcut) {
        shortcut = this.component.shortcut;
      }

      this.root.addShortcut(element, shortcut);
    }
  }, {
    key: "removeShortcut",
    value: function removeShortcut(element, shortcut) {
      // Avoid infinite recursion.
      if (!element || this.root === this) {
        return;
      }

      if (!shortcut) {
        shortcut = this.component.shortcut;
      }

      this.root.removeShortcut(element, shortcut);
    }
    /**
     * Remove all event handlers.
     */

  }, {
    key: "detach",
    value: function detach() {
      this.refs = {};
      this.removeEventListeners();
      this.detachLogic();

      if (this.tooltip) {
        this.tooltip.dispose();
      }
    }
  }, {
    key: "checkRefresh",
    value: function checkRefresh(refreshData, changed) {
      var changePath = _lodash.default.get(changed, 'instance.calculatedPath', false); // Don't let components change themselves.


      if (changePath && this.calculatedPath === changePath) {
        return;
      }

      if (refreshData === 'data') {
        this.refresh(this.data);
      } else if (changePath && changePath === refreshData && changed && changed.instance && // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
      // in fields inside EditGrids could alter their state from other rows (which is bad).
      this.inContext(changed.instance)) {
        this.refresh(changed.value);
      }
    }
  }, {
    key: "checkRefreshOn",
    value: function checkRefreshOn(changed) {
      var _this6 = this;

      var refreshOn = this.component.refreshOn || this.component.redrawOn; // If they wish to refresh on a value, then add that here.

      if (refreshOn) {
        if (Array.isArray(refreshOn)) {
          refreshOn.forEach(function (refreshData) {
            _this6.checkRefresh(refreshData, changed);
          });
        } else {
          this.checkRefresh(refreshOn, changed);
        }
      }
    }
    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */

  }, {
    key: "refresh",
    value: function refresh(value) {
      if (this.hasOwnProperty('refreshOnValue')) {
        this.refreshOnChanged = !_lodash.default.isEqual(value, this.refreshOnValue);
      } else {
        this.refreshOnChanged = true;
      }

      this.refreshOnValue = (0, FormioUtils.fastCloneDeep)(value);

      if (this.refreshOnChanged) {
        if (this.component.clearOnRefresh) {
          this.setValue(null);
        }

        this.triggerRedraw();
      }
    }
    /**
     * Checks to see if a separate component is in the "context" of this component. This is determined by first checking
     * if they share the same "data" object. It will then walk up the parent tree and compare its parents data objects
     * with the components data and returns true if they are in the same context.
     *
     * Different rows of the same EditGrid, for example, are in different contexts.
     *
     * @param component
     */

  }, {
    key: "inContext",
    value: function inContext(component) {
      if (component.data === this.data) {
        return true;
      }

      var parent = this.parent;

      while (parent) {
        if (parent.data === component.data) {
          return true;
        }

        parent = parent.parent;
      }

      return false;
    }
  }, {
    key: "createViewOnlyElement",
    value: function createViewOnlyElement() {
      this.element = this.ce('dl', {
        id: this.id
      });

      if (this.element) {
        // Ensure you can get the component info from the element.
        this.element.component = this;
      }

      return this.element;
    }
  }, {
    key: "getWidgetValueAsString",

    /**
     * Uses the widget to determine the output string.
     *
     * @param value
     * @return {*}
     */
    value: function getWidgetValueAsString(value) {
      var _this7 = this;

      var noInputWidget = !this.refs.input || !this.refs.input[0] || !this.refs.input[0].widget;

      if (!value || noInputWidget) {
        return value;
      }

      if (Array.isArray(value)) {
        var values = [];
        value.forEach(function (val, index) {
          var widget = _this7.refs.input[index] && _this7.refs.input[index].widge;

          if (widget) {
            values.push(widget.getValueAsString(val));
          }
        });
        return values;
      }

      var widget = this.refs.input[0].widget;
      return widget.getValueAsString(value);
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      value = this.getWidgetValueAsString(value);

      if (Array.isArray(value)) {
        return value.join(', ');
      }

      if (_lodash.default.isPlainObject(value)) {
        return JSON.stringify(value);
      }

      if (value === null || value === undefined) {
        return '';
      }

      return value.toString();
    }
  }, {
    key: "getView",
    value: function getView(value) {
      if (this.component.protected) {
        return '--- PROTECTED ---';
      }

      return this.getValueAsString(value);
    }
  }, {
    key: "updateItems",
    value: function updateItems() {
      this.restoreValue();
      this.onChange.apply(this, arguments);
    }
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */

  }, {
    key: "itemValue",
    value: function itemValue(data) {
      var forceUseValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (_lodash.default.isObject(data)) {
        if (this.valueProperty) {
          return _lodash.default.get(data, this.valueProperty);
        }

        if (forceUseValue) {
          return data.value;
        }
      }

      return data;
    }
  }, {
    key: "itemValueForHTMLMode",
    value: function itemValueForHTMLMode(value) {
      var _this8 = this;

      if (Array.isArray(value)) {
        var values = value.map(function (item) {
          return Array.isArray(item) ? _this8.itemValueForHTMLMode(item) : _this8.itemValue(item);
        });
        return values.join(', ');
      }

      return this.itemValue(value);
    }
  }, {
    key: "createModal",
    value: function createModal(element, attr) {
      var _this9 = this;

      var dialog = this.ce('div', attr || {});
      this.setContent(dialog, this.renderTemplate('dialog')); // Add refs to dialog, not "this".

      dialog.refs = {};
      this.loadRefs.call(dialog, dialog, {
        dialogOverlay: 'single',
        dialogContents: 'single',
        dialogClose: 'single'
      });
      dialog.refs.dialogContents.appendChild(element);
      document.body.appendChild(dialog);
      document.body.classList.add('modal-open');

      dialog.close = function () {
        document.body.classList.remove('modal-open');
        dialog.dispatchEvent(new CustomEvent('close'));
      };

      this.addEventListener(dialog, 'close', function () {
        return _this9.removeChildFrom(dialog, document.body);
      });

      var close = function close(event) {
        event.preventDefault();
        dialog.close();
      };

      this.addEventListener(dialog.refs.dialogOverlay, 'click', close);
      this.addEventListener(dialog.refs.dialogClose, 'click', close);
      return dialog;
    }
    /**
     * Retrieves the CSS class name of this component.
     * @returns {string} - The class name of this component.
     */

  }, {
    key: "getElement",

    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    value: function getElement() {
      return this.element;
    }
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */

  }, {
    key: "evalContext",
    value: function evalContext(additional) {
      return _get(_getPrototypeOf(Component.prototype), "evalContext", this).call(this, Object.assign({
        component: this.component,
        row: this.data,
        rowIndex: this.rowIndex,
        data: this.rootValue,
        iconClass: this.iconClass.bind(this),
        submission: this.root ? this.root._submission : {},
        form: this.root ? this.root._form : {}
      }, additional));
    }
    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */

  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      this.pristine = pristine;
    }
    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */

  }, {
    key: "removeValue",
    value: function removeValue(index) {
      this.splice(index);
      this.redraw();
      this.restoreValue();
      this.triggerRootChange();
    }
  }, {
    key: "iconClass",
    value: function iconClass(name, spinning) {
      var iconset = this.options.iconset || _Templates.default.current.defaultIconset || 'fa';
      return _Templates.default.current.hasOwnProperty('iconClass') ? _Templates.default.current.iconClass(iconset, name, spinning) : this.options.iconset === 'fa' ? _Templates.default.defaultTemplates.iconClass(iconset, name, spinning) : name;
    }
  }, {
    key: "size",
    value: function size(_size) {
      return _Templates.default.current.hasOwnProperty('size') ? _Templates.default.current.size(_size) : _size;
    }
    /**
     * The readible name for this component.
     * @returns {string} - The name of the component.
     */

  }, {
    key: "errorMessage",

    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    value: function errorMessage(type) {
      return this.component.errors && this.component.errors[type] ? this.component.errors[type] : type;
    }
  }, {
    key: "setContent",
    value: function setContent(element, content) {
      if (element instanceof HTMLElement) {
        element.innerHTML = this.sanitize(content);
        return true;
      }

      return false;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      // Don't bother if we have not built yet.
      if (!this.element || !this.element.parentNode) {
        // Return a non-resolving promise.
        return _nativePromiseOnly.default.resolve();
      }

      this.clear(); // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.

      var parent = this.element.parentNode;
      var index = Array.prototype.indexOf.call(parent.children, this.element);
      this.element.outerHTML = this.sanitize(this.render());
      this.element = parent.children[index];
      return this.attach(this.element);
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      this.destroy();
      this.init();
      return this.redraw();
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      _get(_getPrototypeOf(Component.prototype), "removeEventListeners", this).call(this);

      this.tooltips.forEach(function (tooltip) {
        return tooltip.dispose();
      });
      this.tooltips = [];
      this.refs.input = [];
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "hasClass", this).call(this, element, this.transform('class', className));
    }
  }, {
    key: "addClass",
    value: function addClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "addClass", this).call(this, element, this.transform('class', className));
    }
  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "removeClass", this).call(this, element, this.transform('class', className));
    }
    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */

  }, {
    key: "hasCondition",
    value: function hasCondition() {
      if (this._hasCondition !== null) {
        return this._hasCondition;
      }

      this._hasCondition = FormioUtils.hasCondition(this.component);
      return this._hasCondition;
    }
    /**
     * Check if this component is conditionally visible.
     *
     * @param data
     * @return {boolean}
     */

  }, {
    key: "conditionallyVisible",
    value: function conditionallyVisible(data, row) {
      data = data || this.rootValue;
      row = row || this.data;

      if (this.builderMode || !this.hasCondition()) {
        return !this.component.hidden;
      }

      data = data || (this.root ? this.root.data : {});
      return this.checkCondition(row, data);
    }
    /**
     * Checks the condition of this component.
     *
     * TODO: Switch row and data parameters to be consistent with other methods.
     *
     * @param row - The row contextual data.
     * @param data - The global data object.
     * @return {boolean} - True if the condition applies to this component.
     */

  }, {
    key: "checkCondition",
    value: function checkCondition(row, data) {
      return FormioUtils.checkCondition(this.component, row || this.data, data || this.rootValue, this.root ? this.root._form : {}, this);
    }
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */

  }, {
    key: "checkComponentConditions",
    value: function checkComponentConditions(data, flags, row) {
      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;

      if (!this.builderMode && this.fieldLogic(data, row)) {
        this.redraw();
      } // Check advanced conditions


      var visible = this.conditionallyVisible(data, row);

      if (this.visible !== visible) {
        this.visible = visible;
      }

      return visible;
    }
    /**
     * Checks conditions for this component and any sub components.
     * @param args
     * @return {boolean}
     */

  }, {
    key: "checkConditions",
    value: function checkConditions(data, flags, row) {
      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;
      return this.checkComponentConditions(data, flags, row);
    }
  }, {
    key: "fieldLogic",

    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    value: function fieldLogic(data, row) {
      var _this10 = this;

      data = data || this.rootValue;
      row = row || this.data;
      var logics = this.logic; // If there aren't logic, don't go further.

      if (logics.length === 0) {
        return;
      }

      var newComponent = (0, FormioUtils.fastCloneDeep)(this.originalComponent);
      var changed = logics.reduce(function (changed, logic) {
        var result = FormioUtils.checkTrigger(newComponent, logic.trigger, row, data, _this10.root ? _this10.root._form : {}, _this10);
        return (result ? _this10.applyActions(newComponent, logic.actions, result, row, data) : false) || changed;
      }, false); // If component definition changed, replace and mark as changed.

      if (!_lodash.default.isEqual(this.component, newComponent)) {
        this.component = newComponent; // If disabled changed, be sure to distribute the setting.

        this.disabled = this.shouldDisabled;
        changed = true;
      }

      return changed;
    }
  }, {
    key: "isIE",
    value: function isIE() {
      var userAgent = window.navigator.userAgent;
      var msie = userAgent.indexOf('MSIE ');

      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
      }

      var trident = userAgent.indexOf('Trident/');

      if (trident > 0) {
        // IE 11 => return version number
        var rv = userAgent.indexOf('rv:');
        return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
      }

      var edge = userAgent.indexOf('Edge/');

      if (edge > 0) {
        // IE 12 (aka Edge) => return version number
        return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
      } // other browser


      return false;
    }
  }, {
    key: "applyActions",
    value: function applyActions(newComponent, actions, result, row, data) {
      var _this11 = this;

      data = data || this.rootValue;
      row = row || this.data;
      return actions.reduce(function (changed, action) {
        switch (action.type) {
          case 'property':
            {
              FormioUtils.setActionProperty(newComponent, action, result, row, data, _this11);
              var property = action.property.value;

              if (!_lodash.default.isEqual(_lodash.default.get(_this11.component, property), _lodash.default.get(newComponent, property))) {
                changed = true;
              }

              break;
            }

          case 'value':
            {
              var oldValue = _this11.getValue();

              var newValue = _this11.evaluate(action.value, {
                value: _lodash.default.clone(oldValue),
                data: data,
                row: row,
                component: newComponent,
                result: result
              }, 'value');

              if (!_lodash.default.isEqual(oldValue, newValue)) {
                _this11.setValue(newValue);

                if (_this11.viewOnly) {
                  _this11.dataValue = newValue;
                }

                changed = true;
              }

              break;
            }

          case 'mergeComponentSchema':
            {
              var schema = _this11.evaluate(action.schemaDefinition, {
                value: _lodash.default.clone(_this11.getValue()),
                data: data,
                row: row,
                component: newComponent,
                result: result
              }, 'schema');

              _lodash.default.assign(newComponent, schema);

              if (!_lodash.default.isEqual(_this11.component, newComponent)) {
                changed = true;
              }

              break;
            }
        }

        return changed;
      }, false);
    } // Deprecated

  }, {
    key: "addInputError",
    value: function addInputError(message, dirty, elements) {
      this.addMessages(message);
      this.setErrorClasses(elements, dirty, !!message);
    } // Deprecated

  }, {
    key: "removeInputError",
    value: function removeInputError(elements) {
      this.setErrorClasses(elements, true, false);
    }
    /**
     * Add a new input error to this element.
     *
     * @param message
     * @param dirty
     */

  }, {
    key: "addMessages",
    value: function addMessages(messages) {
      var _this12 = this;

      if (!messages) {
        return;
      } // Standardize on array of objects for message.


      if (typeof messages === 'string') {
        messages = {
          messages: messages,
          level: 'error'
        };
      }

      if (!Array.isArray(messages)) {
        messages = [messages];
      }

      if (this.refs.messageContainer) {
        this.setContent(this.refs.messageContainer, messages.map(function (message) {
          return _this12.renderTemplate('message', message);
        }).join(''));
      }
    }
  }, {
    key: "setErrorClasses",
    value: function setErrorClasses(elements, dirty, hasErrors, hasMessages) {
      var _this13 = this;

      this.clearErrorClasses();
      elements.forEach(function (element) {
        return _this13.removeClass(_this13.performInputMapping(element), 'is-invalid');
      });

      if (hasErrors) {
        // Add error classes
        elements.forEach(function (input) {
          return _this13.addClass(_this13.performInputMapping(input), 'is-invalid');
        });

        if (dirty && this.options.highlightErrors) {
          this.addClass(this.element, this.options.componentErrorClass);
        } else {
          this.addClass(this.element, 'has-error');
        }
      }

      if (hasMessages) {
        this.addClass(this.element, 'has-message');
      }
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide() {
      // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
      if (!this.rootPristine && this.component.clearOnHide !== false && !this.options.readOnly && !this.options.showHiddenFields) {
        if (!this.visible) {
          this.deleteValue();
        } else if (!this.hasValue()) {
          // If shown, ensure the default is set.
          this.setValue(this.defaultValue, {
            noUpdateEvent: true
          });
        }
      }
    }
  }, {
    key: "triggerRootChange",
    value: function triggerRootChange() {
      if (this.options.onChange) {
        var _this$options;

        (_this$options = this.options).onChange.apply(_this$options, arguments);
      } else if (this.root) {
        var _this$root;

        (_this$root = this.root).triggerChange.apply(_this$root, arguments);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(flags, fromRoot) {
      flags = flags || {};

      if (flags.modified) {
        this.pristine = false;
        this.addClass(this.getElement(), 'formio-modified');
      } // If we are supposed to validate on blur, then don't trigger validation yet.


      if (this.component.validateOn === 'blur' && !this.errors.length) {
        flags.noValidate = true;
      }

      if (this.component.onChange) {
        this.evaluate(this.component.onChange, {
          flags: flags
        });
      } // Set the changed variable.


      var changed = {
        instance: this,
        component: this.component,
        value: this.dataValue,
        flags: flags
      }; // Emit the change.

      this.emit('componentChange', changed); // Do not propogate the modified flag.

      var modified = false;

      if (flags.modified) {
        modified = true;
        delete flags.modified;
      } // Bubble this change up to the top.


      if (!fromRoot) {
        this.triggerRootChange(flags, changed, modified);
      }

      return changed;
    }
  }, {
    key: "addCKE",
    value: function addCKE(element, settings, onChange) {
      settings = _lodash.default.isEmpty(settings) ? {} : settings;
      settings.base64Upload = true;
      settings.mediaEmbed = {
        previewsInData: true
      };
      settings = _lodash.default.merge(_lodash.default.get(this.options, 'editors.ckeditor.settings', this.ckEditorConfig), settings);
      return _Formio.default.requireLibrary('ckeditor', 'ClassicEditor', _lodash.default.get(this.options, 'editors.ckeditor.src', CKEDITOR), true).then(function () {
        if (!element.parentNode) {
          return _nativePromiseOnly.default.reject();
        }

        return ClassicEditor.create(element, settings).then(function (editor) {
          editor.model.document.on('change', function () {
            return onChange(editor.data.get());
          });
          return editor;
        });
      });
    }
  }, {
    key: "addQuill",
    value: function addQuill(element, settings, onChange) {
      var _this14 = this;

      settings = _lodash.default.isEmpty(settings) ? this.wysiwygDefault : settings;
      settings = _lodash.default.merge(_lodash.default.get(this.options, 'editors.quill.settings', {}), settings); // Lazy load the quill css.

      if (!settings.theme) {
        settings.theme = 'snow';
      }

      _Formio.default.requireLibrary("quill-css-".concat(settings.theme), 'Quill', [{
        type: 'styles',
        src: "".concat(QUILL_URL, "/quill.").concat(settings.theme, ".css")
      }], true); // Lazy load the quill library.


      return _Formio.default.requireLibrary('quill', 'Quill', _lodash.default.get(this.options, 'editors.quill.src', "".concat(QUILL_URL, "/quill.min.js")), true).then(function () {
        if (!element.parentNode) {
          return _nativePromiseOnly.default.reject();
        }

        _this14.quill = new Quill(element, settings);
        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/

        var txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');

        _this14.quill.addContainer('ql-custom').appendChild(txtArea);

        var qlSource = element.parentNode.querySelector('.ql-source');

        if (qlSource) {
          _this14.addEventListener(qlSource, 'click', function (event) {
            event.preventDefault();

            if (txtArea.style.display === 'inherit') {
              _this14.quill.setContents(_this14.quill.clipboard.convert(txtArea.value));
            }

            txtArea.style.display = txtArea.style.display === 'none' ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/
        // Make sure to select cursor when they click on the element.


        _this14.addEventListener(element, 'click', function () {
          return _this14.quill.focus();
        }); // Allows users to skip toolbar items when tabbing though form


        var elm = document.querySelectorAll('.ql-formats > button');

        for (var i = 0; i < elm.length; i++) {
          elm[i].setAttribute('tabindex', '-1');
        }

        _this14.quill.on('text-change', function () {
          txtArea.value = _this14.quill.root.innerHTML;
          onChange(txtArea);
        });

        return _this14.quill;
      });
    }
  }, {
    key: "addAce",
    value: function addAce(element, settings, onChange) {
      var defaultAceSettings = {
        maxLines: 12,
        minLines: 12,
        tabSize: 2,
        mode: 'javascript'
      };

      if (!settings || settings.theme === 'snow') {
        var mode = settings ? settings.mode : '';
        settings = {};

        if (mode) {
          settings.mode = mode;
        }
      }

      settings = _lodash.default.merge({}, defaultAceSettings, _lodash.default.get(this.options, 'editors.ace.settings', {}), settings || {});
      return _Formio.default.requireLibrary('ace', 'ace', _lodash.default.get(this.options, 'editors.ace.src', ACE_URL), true).then(function (editor) {
        editor = editor.edit(element);
        editor.removeAllListeners('change');
        editor.setOptions(settings);
        editor.getSession().setMode("ace/mode/".concat(settings.mode));
        editor.on('change', function () {
          return onChange(editor.getValue());
        });
        return editor;
      });
    }
  }, {
    key: "addTiny",
    value: function addTiny(element, settings, onChange) {
      return _Formio.default.requireLibrary('tinymce', 'tinymce', TINYMCE_URL.replace('no-api-key', settings.tinyApiKey), true).then(function (editor) {
        return editor.init(_objectSpread(_objectSpread({}, settings), {}, {
          target: element,
          theme: 'silver',
          // eslint-disable-next-line camelcase
          init_instance_callback: function init_instance_callback(editor) {
            editor.on('Change', function () {
              return onChange(editor.getContent());
            });
          }
        }));
      });
    }
  }, {
    key: "hasValue",

    /**
     * Returns if this component has a value set.
     *
     */
    value: function hasValue(data) {
      return _lodash.default.has(data || this.data, this.key);
    }
    /**
     * Get the data value at the root level.
     *
     * @return {*}
     */

  }, {
    key: "splice",

    /**
     * Splice a value from the dataValue.
     *
     * @param index
     */
    value: function splice(index) {
      if (this.hasValue()) {
        var dataValue = this.dataValue || [];

        if (_lodash.default.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
          dataValue.splice(index, 1);
          this.dataValue = dataValue;
          this.triggerChange();
        }
      }
    }
  }, {
    key: "unset",
    value: function unset() {
      _lodash.default.unset(this._data, this.key);
    }
    /**
     * Deletes the value of the component.
     */

  }, {
    key: "deleteValue",
    value: function deleteValue() {
      this.setValue(null, {
        noUpdateEvent: true,
        noDefault: true
      });
      this.unset();
    }
  }, {
    key: "getValue",

    /**
     * Get the input value of this component.
     *
     * @return {*}
     */
    value: function getValue() {
      if (!this.hasInput || this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var values = [];

      for (var i in this.refs.input) {
        if (this.refs.input.hasOwnProperty(i)) {
          if (!this.component.multiple) {
            return this.getValueAt(i);
          }

          values.push(this.getValueAt(i));
        }
      }

      if (values.length === 0 && !this.component.multiple) {
        return '';
      }

      return values;
    }
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      var input = this.performInputMapping(this.refs.input[index]);
      return input ? input.value : undefined;
    }
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     *
     * @return {boolean} - If the value changed.
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var changed = this.updateValue(value, flags);

      if (this.componentModal && flags && flags.fromSubmission) {
        this.componentModal.setValue(value);
      }

      value = this.dataValue;

      if (!this.hasInput) {
        return changed;
      }

      var isArray = Array.isArray(value);

      if (isArray && Array.isArray(this.defaultValue) && this.refs.hasOwnProperty('input') && this.refs.input && this.refs.input.length !== value.length) {
        this.redraw();
      }

      for (var i in this.refs.input) {
        if (this.refs.input.hasOwnProperty(i)) {
          this.setValueAt(i, isArray ? value[i] : value, flags);
        }
      }

      return changed;
    }
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */

  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
        value = this.defaultValue;
      }

      var input = this.performInputMapping(this.refs.input[index]);

      if (input.mask) {
        input.mask.textMaskInputElement.update(value);
      } else if (input.widget && input.widget.setValue) {
        input.widget.setValue(value);
      } else {
        input.value = value;
      }
    }
  }, {
    key: "restoreValue",

    /**
     * Restore the value of a control.
     */
    value: function restoreValue() {
      if (this.hasSetValue) {
        this.setValue(this.dataValue, {
          noUpdateEvent: true
        });
      } else {
        if (this.defaultValue) {
          var defaultValue = this.component.multiple && !this.dataValue.length ? [] : this.defaultValue;
          this.setValue(defaultValue, {
            noUpdateEvent: true
          });
        }
      }
    }
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      if (this.component.multiple && !Array.isArray(value)) {
        value = value ? [value] : [];
      }

      return value;
    }
    /**
     * Update a value of this component.
     *
     * @param flags
     */

  }, {
    key: "updateComponentValue",
    value: function updateComponentValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var newValue = !flags.resetValue && (value === undefined || value === null) ? this.getValue() : value;
      newValue = this.normalizeValue(newValue, flags);
      var changed = newValue !== undefined ? this.hasChanged(newValue, this.dataValue) : false;

      if (changed) {
        this.dataValue = newValue;
        this.updateOnChange(flags, changed);
      }

      return changed;
    }
    /**
     * Updates the value of this component plus all sub-components.
     *
     * @param args
     * @return {boolean}
     */

  }, {
    key: "updateValue",
    value: function updateValue() {
      return this.updateComponentValue.apply(this, arguments);
    }
  }, {
    key: "getIcon",
    value: function getIcon(name, content, styles) {
      var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'icon';
      return this.renderTemplate('icon', {
        className: this.iconClass(name),
        ref: ref,
        styles: styles,
        content: content
      });
    }
    /**
     * Resets the value of this component.
     */

  }, {
    key: "resetValue",
    value: function resetValue() {
      this.setValue(this.emptyValue, {
        noUpdateEvent: true,
        noValidate: true,
        resetValue: true
      });
      this.unset();
    }
    /**
     * Determine if the value of this component has changed.
     *
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */

  }, {
    key: "hasChanged",
    value: function hasChanged(newValue, oldValue) {
      if ((newValue === undefined || newValue === null) && (oldValue === undefined || oldValue === null || this.isEmpty(oldValue))) {
        return false;
      } // If we do not have a value and are getting set to anything other than undefined or null, then we changed.


      if (newValue !== undefined && newValue !== null && this.allowData && !this.hasValue()) {
        return true;
      }

      return !_lodash.default.isEqual(newValue, oldValue);
    }
    /**
     * Update the value on change.
     *
     * @param flags
     */

  }, {
    key: "updateOnChange",
    value: function updateOnChange() {
      var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var changed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!flags.noUpdateEvent && changed) {
        this.triggerChange(flags);
        return true;
      }

      return false;
    }
    /**
     * Perform a calculated value operation.
     *
     * @param data - The global data object.
     *
     * @return {boolean} - If the value changed during calculation.
     */

  }, {
    key: "convertNumberOrBoolToString",
    value: function convertNumberOrBoolToString(value) {
      if (typeof value === 'number' || typeof value === 'boolean') {
        return value.toString();
      }

      return value;
    }
  }, {
    key: "calculateComponentValue",
    value: function calculateComponentValue(data, flags, row) {
      // If no calculated value or
      // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
      var _this$component = this.component,
          hidden = _this$component.hidden,
          clearOnHide = _this$component.clearOnHide;
      var shouldBeCleared = (!this.visible || hidden) && clearOnHide && !this.rootPristine;

      if (!this.component.calculateValue || shouldBeCleared) {
        return false;
      } // If this component allows overrides.


      var allowOverride = this.component.allowCalculateOverride;
      var firstPass = false;
      var dataValue = this.dataValue; // First pass, the calculatedValue is undefined.

      if (this.calculatedValue === undefined) {
        firstPass = true;
        this.calculatedValue = null;
      } // Calculate the new value.


      var calculatedValue = this.evaluate(this.component.calculateValue, {
        value: dataValue,
        data: data,
        row: row || this.data
      }, 'value') || this.emptyValue;
      var currentCalculatedValue = this.convertNumberOrBoolToString(this.calculatedValue);
      var newCalculatedValue = this.convertNumberOrBoolToString(calculatedValue); // Check to ensure that the calculated value is different than the previously calculated value.

      if (allowOverride && this.calculatedValue && !_lodash.default.isEqual(dataValue, currentCalculatedValue) && _lodash.default.isEqual(newCalculatedValue, currentCalculatedValue)) {
        return false;
      }

      if (flags.fromSubmission && allowOverride && currentCalculatedValue !== this.dataValue) {
        this.calculatedValue = calculatedValue;
        return false;
      } // If this is the firstPass, and the dataValue is different than to the calculatedValue.


      if (allowOverride && firstPass && !this.isEmpty(dataValue) && !_lodash.default.isEqual(dataValue, this.convertNumberOrBoolToString(calculatedValue)) && !_lodash.default.isEqual(calculatedValue, this.convertNumberOrBoolToString(calculatedValue))) {
        // Return that we have a change so it will perform another pass.
        this.calculatedValue = calculatedValue;
        return true;
      } // Set the new value.


      var changed = this.setValue(calculatedValue, flags);
      this.calculatedValue = this.dataValue;
      return changed;
    }
    /**
     * Performs calculations in this component plus any child components.
     *
     * @param args
     * @return {boolean}
     */

  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags, row) {
      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;
      return this.calculateComponentValue(data, flags, row);
    }
    /**
     * Get this component's label text.
     *
     */

  }, {
    key: "getRoot",

    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    value: function getRoot() {
      return this.root;
    }
    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */

  }, {
    key: "invalidMessage",
    value: function invalidMessage(data, dirty, ignoreCondition, row) {
      if (!ignoreCondition && !this.checkCondition(row, data)) {
        return '';
      } // See if this is forced invalid.


      if (this.invalid) {
        return this.invalid;
      } // No need to check for errors if there is no input or if it is pristine.


      if (!this.hasInput || !dirty && this.pristine) {
        return '';
      }

      return _lodash.default.map(_Validator.default.checkComponent(this, data), 'message').join('\n\n');
    }
    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid(data, dirty) {
      return !this.invalidMessage(data, dirty);
    }
  }, {
    key: "setComponentValidity",
    value: function setComponentValidity(messages, dirty) {
      var hasErrors = !!messages.filter(function (message) {
        return message.level === 'error';
      }).length;

      if (messages.length && (dirty || !this.pristine)) {
        this.setCustomValidity(messages, dirty);
      } else {
        this.setCustomValidity('');
      }

      return !hasErrors;
    }
    /**
     * Checks the validity of this component and sets the error message if it is invalid.
     *
     * @param data
     * @param dirty
     * @param row
     * @return {boolean}
     */

  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row) {
      var _this15 = this;

      var async = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      data = data || this.rootValue;
      row = row || this.data;

      if (this.shouldSkipValidation(data, dirty, row)) {
        this.setCustomValidity('');
        return async ? _nativePromiseOnly.default.resolve(true) : true;
      }

      var check = _Validator.default.checkComponent(this, data, row, true, async);

      return async ? check.then(function (messages) {
        return _this15.setComponentValidity(messages, dirty);
      }) : this.setComponentValidity(check, dirty);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row) {
      data = data || this.rootValue;
      row = row || this.data;
      return this.checkComponentValidity(data, dirty, row);
    }
  }, {
    key: "checkAsyncValidity",
    value: function checkAsyncValidity(data, dirty, row) {
      return _nativePromiseOnly.default.resolve(this.checkComponentValidity(data, dirty, row, true));
    }
    /**
     * Check the conditions, calculations, and validity of a single component and triggers an update if
     * something changed.
     *
     * @param data - The root data of the change event.
     * @param flags - The flags from this change event.
     *
     * @return boolean - If component is valid or not.
     */

  }, {
    key: "checkData",
    value: function checkData(data, flags, row) {
      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;
      this.checkRefreshOn(flags.changed);

      if (flags.noCheck) {
        return true;
      }

      this.calculateComponentValue(data, flags, row);
      this.checkComponentConditions(data, flags, row);

      if (flags.noValidate) {
        return true;
      } // We need to perform a test to see if they provided a default value that is not valid and immediately show
      // an error if that is the case.


      var isDirty = !this.builderMode && !this.options.preview && !this.isEmpty(this.defaultValue) && this.isEqual(this.defaultValue, this.dataValue); // We need to set dirty if they explicitly set noValidate to false.

      if (this.options.alwaysDirty || flags.dirty) {
        isDirty = true;
      } // See if they explicitely set the values with setSubmission.


      if (flags.fromSubmission && this.hasValue(data)) {
        isDirty = true;
      }

      return this.checkComponentValidity(data, isDirty, row);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      var isEmptyArray = _lodash.default.isArray(value) && value.length === 1 ? _lodash.default.isEqual(value[0], this.emptyValue) : false;
      return value == null || value.length === 0 || _lodash.default.isEqual(value, this.emptyValue) || isEmptyArray;
    }
  }, {
    key: "isEqual",
    value: function isEqual(valueA) {
      var valueB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataValue;
      return this.isEmpty(valueA) && this.isEmpty(valueB) || _lodash.default.isEqual(valueA, valueB);
    }
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: "validateMultiple",
    value: function validateMultiple() {
      return true;
    }
  }, {
    key: "clearErrorClasses",
    value: function clearErrorClasses() {
      this.removeClass(this.element, this.options.componentErrorClass);
      this.removeClass(this.element, 'alert alert-danger');
      this.removeClass(this.element, 'has-error');
      this.removeClass(this.element, 'has-message');
    }
  }, {
    key: "setCustomValidity",
    value: function setCustomValidity(messages, dirty, external) {
      if (typeof messages === 'string' && messages) {
        messages = {
          level: 'error',
          message: messages
        };
      }

      if (!Array.isArray(messages)) {
        if (messages) {
          messages = [messages];
        } else {
          messages = [];
        }
      }

      var hasErrors = !!messages.filter(function (message) {
        return message.level === 'error';
      }).length;

      if (messages.length) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = {
          component: this.component,
          message: messages[0].message,
          messages: messages,
          external: !!external
        };
        this.emit('componentError', this.error);
        this.addMessages(messages, dirty, this.refs.input);

        if (this.refs.input) {
          this.setErrorClasses(this.refs.input, dirty, hasErrors, !!messages.length);
        }
      } else if (this.error && this.error.external === !!external) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = null;

        if (this.refs.input) {
          this.setErrorClasses(this.refs.input, dirty, hasErrors, !!messages.length);
        }

        this.clearErrorClasses();
      } // if (!this.refs.input) {
      //   return;
      // }
      // this.refs.input.forEach(input => {
      //   input = this.performInputMapping(input);
      //   if (typeof input.setCustomValidity === 'function') {
      //     input.setCustomValidity(message, dirty);
      //   }
      // });

    }
    /**
     * Determines if the value of this component is hidden from the user as if it is coming from the server, but is
     * protected.
     *
     * @return {boolean|*}
     */

  }, {
    key: "isValueHidden",
    value: function isValueHidden() {
      if (!this.root || !this.root.hasOwnProperty('editing')) {
        return false;
      }

      if (!this.root || !this.root.editing) {
        return false;
      }

      return this.component.protected || !this.component.persistent || this.component.persistent === 'client-only';
    }
  }, {
    key: "shouldSkipValidation",
    value: function shouldSkipValidation(data, dirty, row) {
      var _this16 = this;

      var rules = [// Force valid if component is read-only
      function () {
        return _this16.options.readOnly;
      }, // Check to see if we are editing and if so, check component persistence.
      function () {
        return _this16.isValueHidden();
      }, // Force valid if component is hidden.
      function () {
        return !_this16.visible;
      }, // Force valid if component is conditionally hidden.
      function () {
        return !_this16.checkCondition(row, data);
      }];
      return rules.some(function (pred) {
        return pred();
      });
    } // Maintain reverse compatibility.

  }, {
    key: "whenReady",
    value: function whenReady() {
      console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
      return this.dataReady;
    }
  }, {
    key: "asString",

    /**
     * Prints out the value of this component as a string value.
     */
    value: function asString(value) {
      value = value || this.getValue();
      return (Array.isArray(value) ? value : [value]).map(_lodash.default.toString).join(', ');
    }
    /**
     * Return if the component is disabled.
     * @return {boolean}
     */

  }, {
    key: "setDisabled",
    value: function setDisabled(element, disabled) {
      if (!element) {
        return;
      }

      element.disabled = disabled;

      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }, {
    key: "setLoading",
    value: function setLoading(element, loading) {
      if (!element || element.loading === loading) {
        return;
      }

      element.loading = loading;

      if (!element.loader && loading) {
        element.loader = this.ce('i', {
          class: "".concat(this.iconClass('refresh', true), " button-icon-right")
        });
      }

      if (element.loader) {
        if (loading) {
          this.appendTo(element.loader, element);
        } else {
          this.removeChildFrom(element.loader, element);
        }
      }
    }
  }, {
    key: "selectOptions",
    value: function selectOptions(select, tag, options, defaultValue) {
      var _this17 = this;

      _lodash.default.each(options, function (option) {
        var attrs = {
          value: option.value
        };

        if (defaultValue !== undefined && option.value === defaultValue) {
          attrs.selected = 'selected';
        }

        var optionElement = _this17.ce('option', attrs);

        optionElement.appendChild(_this17.text(option.label));
        select.appendChild(optionElement);
      });
    }
  }, {
    key: "setSelectValue",
    value: function setSelectValue(select, value) {
      var options = select.querySelectorAll('option');

      _lodash.default.each(options, function (option) {
        if (option.value === value) {
          option.setAttribute('selected', 'selected');
        } else {
          option.removeAttribute('selected');
        }
      });

      if (select.onchange) {
        select.onchange();
      }

      if (select.onselect) {
        select.onselect();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.detach();
      this.empty(this.getElement());
    }
  }, {
    key: "append",
    value: function append(element) {
      this.appendTo(element, this.element);
    }
  }, {
    key: "prepend",
    value: function prepend(element) {
      this.prependTo(element, this.element);
    }
  }, {
    key: "removeChild",
    value: function removeChild(element) {
      this.removeChildFrom(element, this.element);
    }
  }, {
    key: "detachLogic",
    value: function detachLogic() {
      var _this18 = this;

      this.logic.forEach(function (logic) {
        if (logic.trigger.type === 'event') {
          var event = _this18.interpolate(logic.trigger.event);

          _this18.off(event); // only applies to callbacks on this component

        }
      });
    }
  }, {
    key: "attachLogic",
    value: function attachLogic() {
      var _this19 = this;

      // Do not attach logic during builder mode.
      if (this.builderMode) {
        return;
      }

      this.logic.forEach(function (logic) {
        if (logic.trigger.type === 'event') {
          var event = _this19.interpolate(logic.trigger.event);

          _this19.on(event, function () {
            var newComponent = (0, FormioUtils.fastCloneDeep)(_this19.originalComponent);

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            if (_this19.applyActions(newComponent, logic.actions, args)) {
              // If component definition changed, replace it.
              if (!_lodash.default.isEqual(_this19.component, newComponent)) {
                _this19.component = newComponent;
              }

              _this19.redraw();
            }
          }, true);
        }
      });
    }
    /**
     * Get the element information.
     */

  }, {
    key: "elementInfo",
    value: function elementInfo() {
      var attributes = {
        name: this.options.name,
        type: this.component.inputType || 'text',
        class: 'form-control',
        lang: this.options.language
      };

      if (this.component.placeholder) {
        attributes.placeholder = this.t(this.component.placeholder);
      }

      if (this.component.tabindex) {
        attributes.tabindex = this.component.tabindex;
      }

      if (this.disabled) {
        attributes.disabled = 'disabled';
      }

      _lodash.default.defaults(attributes, this.component.attributes);

      return {
        type: 'input',
        component: this.component,
        changeEvent: 'change',
        attr: attributes
      };
    }
  }, {
    key: "autofocus",
    value: function autofocus() {
      var _this20 = this;

      if (this.component.autofocus && !this.builderMode) {
        this.on('render', function () {
          return _this20.focus();
        }, true);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.refs.input && this.refs.input[0]) {
        this.refs.input[0].focus();
      }
    }
    /**
     * Get `Formio` instance for working with files
     */

  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
    }
  }, {
    key: "ready",
    get: function get() {
      return _nativePromiseOnly.default.resolve(this);
    }
  }, {
    key: "labelInfo",
    get: function get() {
      var label = {};
      label.hidden = this.labelIsHidden();
      label.className = '';
      label.labelPosition = this.component.labelPosition;
      label.tooltipClass = "".concat(this.iconClass('question-sign'), " text-muted");

      if (this.hasInput && this.component.validate && (0, FormioUtils.boolValue)(this.component.validate.required)) {
        label.className += ' field-required';
      }

      if (label.hidden) {
        label.className += ' control-label--hidden';
      }

      if (this.info.attr.id) {
        label.for = this.info.attr.id;
      }

      return label;
    }
  }, {
    key: "shouldDisabled",
    get: function get() {
      return this.options.readOnly || this.component.disabled || this.options.hasOwnProperty('disabled') && this.options.disabled[this.key];
    }
  }, {
    key: "isInputComponent",
    get: function get() {
      return !this.component.hasOwnProperty('input') || this.component.input;
    }
  }, {
    key: "allowData",
    get: function get() {
      return this.hasInput;
    }
  }, {
    key: "hasInput",
    get: function get() {
      return this.isInputComponent || this.refs.input && this.refs.input.length;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return Component.schema();
    }
  }, {
    key: "key",
    get: function get() {
      return _lodash.default.get(this.component, 'key', '');
    }
  }, {
    key: "parentVisible",
    set: function set(value) {
      if (this._parentVisible !== value) {
        this._parentVisible = value;
        this.clearOnHide();
        this.redraw();
      }
    },
    get: function get() {
      return this._parentVisible;
    }
  }, {
    key: "parentDisabled",
    set: function set(value) {
      if (this._parentDisabled !== value) {
        this._parentDisabled = value;
        this.clearOnHide();
        this.redraw();
      }
    },
    get: function get() {
      return this._parentDisabled;
    }
    /**
     *
     * @param value {boolean}
     */

  }, {
    key: "visible",
    set: function set(value) {
      if (this._visible !== value) {
        this._visible = value;
        this.clearOnHide();
        this.redraw();
      }
    }
    /**
     *
     * @returns {boolean}
     */
    ,
    get: function get() {
      // Show only if visibility changes or if we are in builder mode or if hidden fields should be shown.
      if (this.builderMode || this.options.showHiddenFields) {
        return true;
      }

      if (this.options.hide && this.options.hide[this.component.key]) {
        return false;
      }

      if (this.options.show && this.options.show[this.component.key]) {
        return true;
      }

      return this._visible && this._parentVisible;
    }
  }, {
    key: "currentForm",
    get: function get() {
      return this._currentForm;
    },
    set: function set(instance) {
      this._currentForm = instance;
    }
  }, {
    key: "fullMode",
    get: function get() {
      return this.options.attachMode === 'full';
    }
  }, {
    key: "builderMode",
    get: function get() {
      return this.options.attachMode === 'builder';
    }
  }, {
    key: "calculatedPath",
    get: function get() {
      if (this._path) {
        return this._path;
      }

      this._path = this.key;

      if (!this.root) {
        return this._path;
      }

      var parent = this.parent;

      while (parent && parent.id !== this.root.id) {
        if (['datagrid', 'container', 'editgrid'].includes(parent.type) || parent.tree) {
          this._path = "".concat(parent.key, ".").concat(this._path);
        }

        parent = parent.parent;
      }

      return this._path;
    }
  }, {
    key: "labelPosition",
    get: function get() {
      return this.component.labelPosition;
    }
  }, {
    key: "labelWidth",
    get: function get() {
      return this.component.labelWidth || 30;
    }
  }, {
    key: "labelMargin",
    get: function get() {
      return this.component.labelMargin || 3;
    }
  }, {
    key: "isAdvancedLabel",
    get: function get() {
      return ['left-left', 'left-right', 'right-left', 'right-right'].includes(this.labelPosition);
    }
  }, {
    key: "labelPositions",
    get: function get() {
      return this.labelPosition.split('-');
    }
  }, {
    key: "schema",
    get: function get() {
      return (0, FormioUtils.fastCloneDeep)(this.getModifiedSchema(_lodash.default.omit(this.component, 'id'), this.defaultSchema));
    }
  }, {
    key: "transform",
    get: function get() {
      return _Templates.default.current.hasOwnProperty('transform') ? _Templates.default.current.transform.bind(_Templates.default.current) : function (type, value) {
        return value;
      };
    }
  }, {
    key: "submissionTimezone",
    get: function get() {
      this.options.submissionTimezone = this.options.submissionTimezone || _lodash.default.get(this.root, 'options.submissionTimezone');
      return this.options.submissionTimezone;
    }
  }, {
    key: "viewOnly",
    get: function get() {
      return this.options.readOnly && this.options.viewAsHtml;
    }
  }, {
    key: "defaultViewOnlyValue",
    get: function get() {
      return '-';
    }
  }, {
    key: "className",
    get: function get() {
      var className = this.hasInput ? 'form-group has-feedback ' : '';
      className += "formio-component formio-component-".concat(this.component.type, " ");

      if (this.key) {
        className += "formio-component-".concat(this.key, " ");
      }

      if (this.component.multiple) {
        className += 'formio-component-multiple ';
      }

      if (this.component.customClass) {
        className += this.component.customClass;
      }

      if (this.hasInput && this.component.validate && (0, FormioUtils.boolValue)(this.component.validate.required)) {
        className += ' required';
      }

      if (this.labelIsHidden()) {
        className += ' formio-component-label-hidden';
      }

      if (!this.visible) {
        className += ' formio-hidden';
      }

      return className;
    }
    /**
     * Build the custom style from the layout values
     * @return {string} - The custom style
     */

  }, {
    key: "customStyle",
    get: function get() {
      var customCSS = '';

      _lodash.default.each(this.component.style, function (value, key) {
        if (value !== '') {
          customCSS += "".concat(key, ":").concat(value, ";");
        }
      });

      return customCSS;
    }
  }, {
    key: "isMobile",
    get: function get() {
      return (0, _ismobilejs.default)();
    }
  }, {
    key: "name",
    get: function get() {
      return this.t(this.component.label || this.component.placeholder || this.key);
    }
    /**
     * Returns the error label for this component.
     * @return {*}
     */

  }, {
    key: "errorLabel",
    get: function get() {
      return this.t(this.component.errorLabel || this.component.label || this.component.placeholder || this.key);
    }
  }, {
    key: "logic",
    get: function get() {
      return this.component.logic || [];
    }
  }, {
    key: "wysiwygDefault",
    get: function get() {
      return {
        theme: 'snow',
        placeholder: this.t(this.component.placeholder),
        modules: {
          toolbar: [[{
            'size': ['small', false, 'large', 'huge']
          }], // custom dropdown
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }], [{
            'font': []
          }], ['bold', 'italic', 'underline', 'strike', {
            'script': 'sub'
          }, {
            'script': 'super'
          }, 'clean'], [{
            'color': []
          }, {
            'background': []
          }], [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }, {
            'indent': '-1'
          }, {
            'indent': '+1'
          }, {
            'align': []
          }], ['blockquote', 'code-block'], ['link', 'image', 'video', 'formula', 'source']]
        }
      };
    }
  }, {
    key: "ckEditorConfig",
    get: function get() {
      return {
        image: {
          toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
          styles: ['full', 'alignLeft', 'alignCenter', 'alignRight']
        }
      };
    }
  }, {
    key: "tree",
    get: function get() {
      return this.component.tree || false;
    }
    /**
     * The empty value for this component.
     *
     * @return {null}
     */

  }, {
    key: "emptyValue",
    get: function get() {
      return null;
    }
  }, {
    key: "rootValue",
    get: function get() {
      return this.root ? this.root.data : this.data;
    }
  }, {
    key: "rootPristine",
    get: function get() {
      return _lodash.default.get(this, 'root.pristine', false);
    }
    /**
     * Get the static value of this component.
     * @return {*}
     */

  }, {
    key: "dataValue",
    get: function get() {
      if (!this.key || !this.visible && this.component.clearOnHide && !this.rootPristine) {
        return this.emptyValue;
      }

      if (!this.hasValue()) {
        var empty = this.component.multiple ? [] : this.emptyValue;

        if (!this.rootPristine) {
          this.dataValue = empty;
        }

        return empty;
      }

      return _lodash.default.get(this._data, this.key);
    }
    /**
     * Sets the static value of this component.
     *
     * @param value
     */
    ,
    set: function set(value) {
      if (!this.allowData || !this.key || !this.visible && this.component.clearOnHide && !this.rootPristine) {
        return value;
      }

      if (value !== null && value !== undefined) {
        value = this.hook('setDataValue', value, this.key, this._data);
      }

      if (value === null || value === undefined) {
        this.unset();
        return value;
      }

      _lodash.default.set(this._data, this.key, value);

      return value;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = this.emptyValue;

      if (this.component.defaultValue) {
        defaultValue = this.component.defaultValue;
      }

      if (this.component.customDefaultValue && !this.options.preview) {
        defaultValue = this.evaluate(this.component.customDefaultValue, {
          value: ''
        }, 'value');
      }

      if (this.defaultMask) {
        if (typeof defaultValue === 'string') {
          defaultValue = (0, _vanillaTextMask.conformToMask)(defaultValue, this.defaultMask).conformedValue;

          if (!FormioUtils.matchInputMask(defaultValue, this.defaultMask)) {
            defaultValue = '';
          }
        } else {
          defaultValue = '';
        }
      } // Clone so that it creates a new instance.


      return _lodash.default.cloneDeep(defaultValue);
    }
  }, {
    key: "hasSetValue",
    get: function get() {
      return this.hasValue() && !this.isEmpty(this.dataValue);
    }
  }, {
    key: "label",
    get: function get() {
      return this.component.label;
    }
    /**
     * Set this component's label text and render it.
     *
     * @param value - The new label text.
     */
    ,
    set: function set(value) {
      this.component.label = value;

      if (this.labelElement) {
        this.labelElement.innerText = value;
      }
    }
  }, {
    key: "validationValue",
    get: function get() {
      return this.dataValue;
    }
  }, {
    key: "errors",
    get: function get() {
      return this.error ? [this.error] : [];
    }
  }, {
    key: "dataReady",
    get: function get() {
      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled || this.parentDisabled;
    }
    /**
     * Disable this component.
     *
     * @param {boolean} disabled
     */
    ,
    set: function set(disabled) {
      this._disabled = disabled;
    }
  }, {
    key: "fileService",
    get: function get() {
      if (this.options.fileService) {
        return this.options.fileService;
      }

      if (this.options.formio) {
        return this.options.formio;
      }

      if (this.root && this.root.formio) {
        return this.root.formio;
      }

      var formio = new _Formio.default(); // If a form is loaded, then make sure to set the correct formUrl.

      if (this.root && this.root._form && this.root._form._id) {
        formio.formUrl = "".concat(formio.projectUrl, "/form/").concat(this.root._form._id);
      }

      return formio;
    }
  }]);

  return Component;
}(_Element2.default);

exports.default = Component;
Component.externalLibraries = {};

Component.requireLibrary = function (name, property, src, polling) {
  if (!Component.externalLibraries.hasOwnProperty(name)) {
    Component.externalLibraries[name] = {};
    Component.externalLibraries[name].ready = new _nativePromiseOnly.default(function (resolve, reject) {
      Component.externalLibraries[name].resolve = resolve;
      Component.externalLibraries[name].reject = reject;
    });
    var callbackName = "".concat(name, "Callback");

    if (!polling && !window[callbackName]) {
      window[callbackName] = function () {
        this.resolve();
      }.bind(Component.externalLibraries[name]);
    } // See if the plugin already exists.


    var plugin = _lodash.default.get(window, property);

    if (plugin) {
      Component.externalLibraries[name].resolve(plugin);
    } else {
      src = Array.isArray(src) ? src : [src];
      src.forEach(function (lib) {
        var attrs = {};
        var elementType = '';

        if (typeof lib === 'string') {
          lib = {
            type: 'script',
            src: lib
          };
        }

        switch (lib.type) {
          case 'script':
            elementType = 'script';
            attrs = {
              src: lib.src,
              type: 'text/javascript',
              defer: true,
              async: true
            };
            break;

          case 'styles':
            elementType = 'link';
            attrs = {
              href: lib.src,
              rel: 'stylesheet'
            };
            break;
        } // Add the script to the top page.


        var script = document.createElement(elementType);

        for (var attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }

        document.getElementsByTagName('head')[0].appendChild(script);
      }); // if no callback is provided, then check periodically for the script.

      if (polling) {
        setTimeout(function checkLibrary() {
          var plugin = _lodash.default.get(window, property);

          if (plugin) {
            Component.externalLibraries[name].resolve(plugin);
          } else {
            // check again after 200 ms.
            setTimeout(checkLibrary, 200);
          }
        }, 200);
      }
    }
  }

  return Component.externalLibraries[name].ready;
};

Component.libraryReady = function (name) {
  if (Component.externalLibraries.hasOwnProperty(name) && Component.externalLibraries[name].ready) {
    return Component.externalLibraries[name].ready;
  }

  return _nativePromiseOnly.default.reject("".concat(name, " library was not required."));
};