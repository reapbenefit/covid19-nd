/**
 * @fileoverview added by tsickle
 * Generated from: grid/GridHeaderComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Output, EventEmitter, ViewChild, TemplateRef, Input } from '@angular/core';
var GridHeaderComponent = /** @class */ (function () {
    function GridHeaderComponent() {
        this.headers = [];
        this.sort = new EventEmitter();
    }
    Object.defineProperty(GridHeaderComponent.prototype, "numHeaders", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headers.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} formio
     * @param {?=} query
     * @param {?=} columns
     * @return {?}
     */
    GridHeaderComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @param {?=} columns
     * @return {?}
     */
    function (formio, query, columns) {
        return Promise.resolve([]);
    };
    GridHeaderComponent.propDecorators = {
        actionAllowed: [{ type: Input }],
        sort: [{ type: Output }],
        template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
    };
    return GridHeaderComponent;
}());
export { GridHeaderComponent };
if (false) {
    /** @type {?} */
    GridHeaderComponent.prototype.actionAllowed;
    /** @type {?} */
    GridHeaderComponent.prototype.sort;
    /** @type {?} */
    GridHeaderComponent.prototype.template;
    /** @type {?} */
    GridHeaderComponent.prototype.headers;
}
