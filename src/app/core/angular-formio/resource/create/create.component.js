/**
 * @fileoverview added by tsickle
 * Generated from: resource/create/create.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
var FormioResourceCreateComponent = /** @class */ (function () {
    function FormioResourceCreateComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new EventEmitter();
        this.onSuccess = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FormioResourceCreateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.service.setContext(this.route);
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioResourceCreateComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        this.service
            .save(submission)
            .then((/**
         * @return {?}
         */
        function () {
            _this.router.navigate(['../', _this.service.resource._id, 'view'], {
                relativeTo: _this.route
            });
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError.emit(err); }));
    };
    FormioResourceCreateComponent.decorators = [
        { type: Component, args: [{
                    styles: [".back-button { font-size: 0.8em; } "],
                    template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\"> <a routerLink=\"../\" class=\"back-button\"> <i class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></i> </a> | New {{ service.form.title }} </h3> <formio [form]=\"service.form\" [submission]=\"service.resource\" [refresh]=\"service.refresh\" [error]=\"onError\" [success]=\"onSuccess\" (submit)=\"onSubmit($event)\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceCreateComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: ActivatedRoute },
        { type: Router },
        { type: FormioResourceConfig }
    ]; };
    return FormioResourceCreateComponent;
}());
export { FormioResourceCreateComponent };
if (false) {
    /** @type {?} */
    FormioResourceCreateComponent.prototype.onError;
    /** @type {?} */
    FormioResourceCreateComponent.prototype.onSuccess;
    /** @type {?} */
    FormioResourceCreateComponent.prototype.service;
    /** @type {?} */
    FormioResourceCreateComponent.prototype.route;
    /** @type {?} */
    FormioResourceCreateComponent.prototype.router;
    /** @type {?} */
    FormioResourceCreateComponent.prototype.config;
}
