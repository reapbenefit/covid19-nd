/**
 * @fileoverview added by tsickle
 * Generated from: auth/register/register.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormioAuthService } from '../auth.service';
var FormioAuthRegisterComponent = /** @class */ (function () {
    function FormioAuthRegisterComponent(service) {
        this.service = service;
    }
    FormioAuthRegisterComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio [src]=\"service.registerForm\" (submit)=\"service.onRegisterSubmit($event)\"></formio> "
                },] },
    ];
    /** @nocollapse */
    FormioAuthRegisterComponent.ctorParameters = function () { return [
        { type: FormioAuthService }
    ]; };
    return FormioAuthRegisterComponent;
}());
export { FormioAuthRegisterComponent };
if (false) {
    /** @type {?} */
    FormioAuthRegisterComponent.prototype.service;
}
