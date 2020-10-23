/**
 * @fileoverview added by tsickle
 * Generated from: manager/submission/edit/edit.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
var SubmissionEditComponent = /** @class */ (function () {
    function SubmissionEditComponent(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    /**
     * @param {?} submission
     * @return {?}
     */
    SubmissionEditComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        this.router.navigate(['../../'], { relativeTo: this.route });
    };
    SubmissionEditComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio [renderer]=\"service.config.renderer\" [src]=\"service.formio.submissionUrl\" (submit)=\"onSubmit($event)\" (formLoad)=\"service.setForm($event)\" (submissionLoad)=\"service.submissionLoaded($event)\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    SubmissionEditComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    return SubmissionEditComponent;
}());
export { SubmissionEditComponent };
if (false) {
    /** @type {?} */
    SubmissionEditComponent.prototype.service;
    /** @type {?} */
    SubmissionEditComponent.prototype.router;
    /** @type {?} */
    SubmissionEditComponent.prototype.route;
}
