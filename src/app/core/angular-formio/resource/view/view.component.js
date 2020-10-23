/**
 * @fileoverview added by tsickle
 * Generated from: resource/view/view.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
var FormioResourceViewComponent = /** @class */ (function () {
    function FormioResourceViewComponent(service, config) {
        this.service = service;
        this.config = config;
    }
    FormioResourceViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio [form]=\"service.form\" [submission]=\"service.resource\" [refresh]=\"service.refresh\" [hideComponents]=\"config.parents\" [readOnly]=\"true\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceViewComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: FormioResourceConfig }
    ]; };
    return FormioResourceViewComponent;
}());
export { FormioResourceViewComponent };
if (false) {
    /** @type {?} */
    FormioResourceViewComponent.prototype.service;
    /** @type {?} */
    FormioResourceViewComponent.prototype.config;
}
