/**
 * @fileoverview added by tsickle
 * Generated from: manager/view/view.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter } from '@angular/core';
import { FormManagerConfig } from '../form-manager.config';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '../../auth/auth.service';
import { Formio } from '../../../formiojs';
var FormManagerViewComponent = /** @class */ (function () {
    function FormManagerViewComponent(service, router, route, config, auth) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.auth = auth;
        this.onSuccess = new EventEmitter();
        this.onError = new EventEmitter();
        this.renderOptions = {
            saveDraft: this.config.saveDraft
        };
        this.currentForm = null;
        this.submission = { data: {} };
    }
    /**
     * @return {?}
     */
    FormManagerViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Reset the formio service to this form only.
        this.service.formio = new Formio(this.service.formio.formUrl);
        this.service.loadForm().then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            _this.currentForm = form;
        }));
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormManagerViewComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        this.submission.data = submission.data;
        this.submission.state = 'complete';
        this.service.formio.saveSubmission(this.submission).then((/**
         * @param {?} saved
         * @return {?}
         */
        function (saved) {
            _this.onSuccess.emit();
            _this.router.navigate(['../', 'submission', saved._id], { relativeTo: _this.route });
        })).catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError.emit(err); }));
    };
    FormManagerViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio *ngIf=\"currentForm\" [renderer]=\"config.renderer\" [renderOptions]=\"renderOptions\" [url]=\"service.formio.formUrl\" [form]=\"currentForm\" [submission]=\"submission\" [success]=\"onSuccess\" [error]=\"onError\" (submit)=\"onSubmit($event)\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    FormManagerViewComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: Router },
        { type: ActivatedRoute },
        { type: FormManagerConfig },
        { type: FormioAuthService }
    ]; };
    return FormManagerViewComponent;
}());
export { FormManagerViewComponent };
if (false) {
    /** @type {?} */
    FormManagerViewComponent.prototype.submission;
    /** @type {?} */
    FormManagerViewComponent.prototype.currentForm;
    /** @type {?} */
    FormManagerViewComponent.prototype.renderOptions;
    /** @type {?} */
    FormManagerViewComponent.prototype.onSuccess;
    /** @type {?} */
    FormManagerViewComponent.prototype.onError;
    /** @type {?} */
    FormManagerViewComponent.prototype.service;
    /** @type {?} */
    FormManagerViewComponent.prototype.router;
    /** @type {?} */
    FormManagerViewComponent.prototype.route;
    /** @type {?} */
    FormManagerViewComponent.prototype.config;
    /** @type {?} */
    FormManagerViewComponent.prototype.auth;
}
