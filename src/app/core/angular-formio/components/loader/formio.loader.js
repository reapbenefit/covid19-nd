/**
 * @fileoverview added by tsickle
 * Generated from: components/loader/formio.loader.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var FormioLoader = /** @class */ (function () {
    function FormioLoader() {
        this.loading$ = new BehaviorSubject(true);
        this.loading = true;
    }
    /**
     * @param {?} loading
     * @return {?}
     */
    FormioLoader.prototype.setLoading = /**
     * @param {?} loading
     * @return {?}
     */
    function (loading) {
        this.loading = loading;
        this.loading$.next(loading);
    };
    FormioLoader.decorators = [
        { type: Injectable },
    ];
    return FormioLoader;
}());
export { FormioLoader };
if (false) {
    /** @type {?} */
    FormioLoader.prototype.loading$;
    /** @type {?} */
    FormioLoader.prototype.loading;
}
