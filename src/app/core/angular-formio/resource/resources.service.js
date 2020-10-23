/**
 * @fileoverview added by tsickle
 * Generated from: resource/resources.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import { FormioAuthService } from '../auth/auth.service';
/**
 * @record
 */
export function FormioResourceMap() { }
var FormioResources = /** @class */ (function () {
    function FormioResources(auth) {
        this.auth = auth;
        this.resources = {};
        this.error = new EventEmitter();
        this.onError = this.error;
        this.resources = {
            currentUser: {
                resourceLoaded: this.auth.userReady
            }
        };
    }
    FormioResources.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormioResources.ctorParameters = function () { return [
        { type: FormioAuthService }
    ]; };
    return FormioResources;
}());
export { FormioResources };
if (false) {
    /** @type {?} */
    FormioResources.prototype.resources;
    /** @type {?} */
    FormioResources.prototype.error;
    /** @type {?} */
    FormioResources.prototype.onError;
    /** @type {?} */
    FormioResources.prototype.auth;
}
