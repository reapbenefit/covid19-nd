/**
 * @fileoverview added by tsickle
 * Generated from: custom-component/register-custom-component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { createCustomElement } from '@angular/elements';
import { Components } from '../../formiojs';
import { createCustomFormioComponent } from './create-custom-component';
import { CustomTagsService } from './custom-tags.service';
/**
 * @param {?} tag
 * @param {?} injector
 * @return {?}
 */
export function registerCustomTag(tag, injector) {
    injector.get(CustomTagsService).addCustomTag(tag);
}
/**
 * @param {?} tags
 * @param {?} injector
 * @return {?}
 */
export function registerCustomTags(tags, injector) {
    tags.forEach((/**
     * @param {?} tag
     * @return {?}
     */
    function (tag) { return registerCustomTag(tag, injector); }));
}
/**
 * @param {?} options
 * @param {?} angularComponent
 * @param {?} injector
 * @return {?}
 */
export function registerCustomFormioComponent(options, angularComponent, injector) {
    registerCustomTag(options.selector, injector);
    /** @type {?} */
    var complexCustomComponent = createCustomElement(angularComponent, { injector: injector });
    customElements.define(options.selector, complexCustomComponent);
    Components.setComponent(options.type, createCustomFormioComponent(options));
}
/**
 * @param {?} options
 * @param {?} angularComponent
 * @param {?} formioClass
 * @param {?} injector
 * @return {?}
 */
export function registerCustomFormioComponentWithClass(options, angularComponent, formioClass, injector) {
    registerCustomTag(options.selector, injector);
    /** @type {?} */
    var complexCustomComponent = createCustomElement(angularComponent, { injector: injector });
    customElements.define(options.selector, complexCustomComponent);
    Components.setComponent(options.type, formioClass);
}
