/**
 * @fileoverview added by tsickle
 * Generated from: custom-component/custom-tags.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var CustomTagsService = /** @class */ (function () {
    function CustomTagsService() {
        this.tags = [];
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    CustomTagsService.prototype.addCustomTag = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        this.tags.push(tag);
    };
    CustomTagsService.decorators = [
        { type: Injectable },
    ];
    return CustomTagsService;
}());
export { CustomTagsService };
if (false) {
    /** @type {?} */
    CustomTagsService.prototype.tags;
}
