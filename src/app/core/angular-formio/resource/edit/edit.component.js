/**
 * @fileoverview added by tsickle
 * Generated from: resource/edit/edit.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
var FormioResourceEditComponent = /** @class */ (function () {
    function FormioResourceEditComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.triggerError = new EventEmitter();
    }
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioResourceEditComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        /** @type {?} */
        var edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit)
            .then((/**
         * @return {?}
         */
        function () {
            _this.router.navigate(['../', 'view'], { relativeTo: _this.route });
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.triggerError.emit(err); }));
    };
    FormioResourceEditComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio [form]=\"service.form\" [submission]=\"service.resource\" [error]=\"triggerError\" [refresh]=\"service.refresh\" (submit)=\"onSubmit($event)\" ></formio> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceEditComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: ActivatedRoute },
        { type: Router },
        { type: FormioResourceConfig }
    ]; };
    return FormioResourceEditComponent;
}());
export { FormioResourceEditComponent };
if (false) {
    /** @type {?} */
    FormioResourceEditComponent.prototype.triggerError;
    /** @type {?} */
    FormioResourceEditComponent.prototype.service;
    /** @type {?} */
    FormioResourceEditComponent.prototype.route;
    /** @type {?} */
    FormioResourceEditComponent.prototype.router;
    /** @type {?} */
    FormioResourceEditComponent.prototype.config;
}
