var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * Generated from: custom-component/create-custom-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Components, Utils as FormioUtils } from '../../formiojs';
import { clone, isNil, isArray } from 'lodash';
/** @type {?} */
var BaseInputComponent = Components.components.input;
/** @type {?} */
var TextfieldComponent = Components.components.textfield;
/**
 * @param {?} customComponentOptions
 * @return {?}
 */
export function createCustomFormioComponent(customComponentOptions) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(CustomComponent, _super);
            function CustomComponent(component, options, data) {
                var _this = _super.call(this, component, __assign(__assign({}, options), { sanitizeConfig: {
                        addTags: [customComponentOptions.selector],
                    } }), data) || this;
                _this.component = component;
                _this.id = FormioUtils.getRandomComponentId();
                _this.type = customComponentOptions.type;
                if (customComponentOptions.extraValidators) {
                    _this.validators = _this.validators.concat(customComponentOptions.extraValidators);
                }
                return _this;
            }
            /**
             * @return {?}
             */
            CustomComponent.schema = /**
             * @return {?}
             */
            function () {
                return BaseInputComponent.schema(__assign(__assign({}, customComponentOptions.schema), { type: customComponentOptions.type }));
            };
            Object.defineProperty(CustomComponent.prototype, "defaultSchema", {
                get: /**
                 * @return {?}
                 */
                function () {
                    return CustomComponent.schema();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomComponent.prototype, "emptyValue", {
                get: /**
                 * @return {?}
                 */
                function () {
                    return customComponentOptions.emptyValue || null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CustomComponent, "builderInfo", {
                get: /**
                 * @return {?}
                 */
                function () {
                    return {
                        title: customComponentOptions.title,
                        group: customComponentOptions.group,
                        icon: customComponentOptions.icon,
                        weight: customComponentOptions.weight,
                        documentation: customComponentOptions.documentation,
                        schema: CustomComponent.schema(),
                    };
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @return {?}
             */
            CustomComponent.prototype.elementInfo = /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var info = _super.prototype.elementInfo.call(this);
                info.type = customComponentOptions.selector;
                info.changeEvent = customComponentOptions.changeEvent || 'valueChange';
                info.attr = __assign(__assign({}, info.attr), { class: info.attr.class.replace('form-control', 'form-control-custom-field') // remove the form-control class as the custom angular component may look different
                 });
                return info;
            };
            Object.defineProperty(CustomComponent.prototype, "inputInfo", {
                get: /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var info = __assign({ id: this.key }, this.elementInfo());
                    return info;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @param {?} value
             * @param {?} index
             * @return {?}
             */
            CustomComponent.prototype.renderElement = /**
             * @param {?} value
             * @param {?} index
             * @return {?}
             */
            function (value, index) {
                /** @type {?} */
                var info = this.inputInfo;
                return this.renderTemplate(customComponentOptions.template || 'input', {
                    input: info,
                    value: value,
                    index: index
                });
            };
            /**
             * @param {?} element
             * @return {?}
             */
            CustomComponent.prototype.attach = /**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                var _this = this;
                /** @type {?} */
                var superAttach = _super.prototype.attach.call(this, element);
                this._customAngularElement = element.querySelector(customComponentOptions.selector);
                // Bind the custom options and the validations to the Angular component's inputs (flattened)
                if (this._customAngularElement) {
                    // To make sure we have working input in IE...
                    // IE doesn't render it properly if it's not visible on the screen
                    // due to the whole structure applied via innerHTML to the parent
                    // so we need to use appendChild
                    if (!this._customAngularElement.getAttribute('ng-version')) {
                        this._customAngularElement.removeAttribute('ref');
                        /** @type {?} */
                        var newCustomElement_1 = (/** @type {?} */ (document.createElement(customComponentOptions.selector)));
                        newCustomElement_1.setAttribute('ref', 'input');
                        Object.keys(this.inputInfo.attr).forEach((/**
                         * @param {?} attr
                         * @return {?}
                         */
                        function (attr) {
                            newCustomElement_1.setAttribute(attr, _this.inputInfo.attr[attr]);
                        }));
                        this._customAngularElement.appendChild(newCustomElement_1);
                        this._customAngularElement = newCustomElement_1;
                        superAttach = _super.prototype.attach.call(this, element);
                    }
                    // Bind customOptions
                    for (var key in this.component.customOptions) {
                        if (this.component.customOptions.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.customOptions[key];
                        }
                    }
                    // Bind validate options
                    for (var key in this.component.validate) {
                        if (this.component.validate.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.validate[key];
                        }
                    }
                    // Bind options explicitly set
                    /** @type {?} */
                    var fieldOptions = customComponentOptions.fieldOptions;
                    if (isArray(fieldOptions) && fieldOptions.length > 0) {
                        for (var key in fieldOptions) {
                            if (fieldOptions.hasOwnProperty(key)) {
                                this._customAngularElement[fieldOptions[key]] = this.component[fieldOptions[key]];
                            }
                        }
                    }
                    // Attach event listener for emit event
                    this._customAngularElement.addEventListener('formioEvent', (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        _this.emit(event.detail.eventName, __assign(__assign({}, event.detail.data), { component: _this.component }));
                    }));
                    // Ensure we bind the value (if it isn't a multiple-value component with no wrapper)
                    if (!this._customAngularElement.value && !this.component.disableMultiValueWrapper) {
                        this.restoreValue();
                    }
                }
                return superAttach;
            };
            // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
            // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
            /**
             * @return {?}
             */
            CustomComponent.prototype.useWrapper = 
            // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
            /**
             * @return {?}
             */
            function () {
                return this.component.hasOwnProperty('multiple') && this.component.multiple && !this.component.disableMultiValueWrapper;
            };
            Object.defineProperty(CustomComponent.prototype, "defaultValue", {
                get: /**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var defaultValue = this.emptyValue;
                    // handle falsy default value
                    if (!isNil(this.component.defaultValue)) {
                        defaultValue = this.component.defaultValue;
                    }
                    if (this.component.customDefaultValue && !this.options.preview) {
                        defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
                    }
                    return clone(defaultValue);
                },
                enumerable: true,
                configurable: true
            });
            return CustomComponent;
        }(BaseInputComponent)),
        _a.editForm = customComponentOptions.editForm || TextfieldComponent.editForm,
        _a;
}
