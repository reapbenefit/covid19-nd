/**
 * @fileoverview added by tsickle
 * Generated from: manager/submission/view/view.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
var SubmissionViewComponent = /** @class */ (function () {
    function SubmissionViewComponent(service) {
        this.service = service;
    }
    SubmissionViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio [renderer]=\"service.config.renderer\" [src]=\"service.formio.submissionUrl\" [readOnly]=\"true\" (formLoad)=\"service.setForm($event)\" (submissionLoad)=\"service.submissionLoaded($event)\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    SubmissionViewComponent.ctorParameters = function () { return [
        { type: FormManagerService }
    ]; };
    return SubmissionViewComponent;
}());
export { SubmissionViewComponent };
if (false) {
    /** @type {?} */
    SubmissionViewComponent.prototype.service;
}
