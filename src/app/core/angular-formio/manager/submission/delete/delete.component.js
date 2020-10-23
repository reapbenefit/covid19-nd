/**
 * @fileoverview added by tsickle
 * Generated from: manager/submission/delete/delete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '../../../components/alerts/formio.alerts';
var SubmissionDeleteComponent = /** @class */ (function () {
    function SubmissionDeleteComponent(service, router, route, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
    }
    /**
     * @return {?}
     */
    SubmissionDeleteComponent.prototype.onDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.formio.deleteSubmission().then((/**
         * @return {?}
         */
        function () {
            _this.router.navigate(['../../'], { relativeTo: _this.route });
        })).catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.alerts.setAlert({ type: 'danger', message: (err.message || err) }); }));
    };
    /**
     * @return {?}
     */
    SubmissionDeleteComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    };
    SubmissionDeleteComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts> <h3>Are you sure you wish to delete this record?</h3> <div class=\"btn-toolbar\"> <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button> <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button> </div> "
                },] },
    ];
    /** @nocollapse */
    SubmissionDeleteComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: Router },
        { type: ActivatedRoute },
        { type: FormioAlerts }
    ]; };
    return SubmissionDeleteComponent;
}());
export { SubmissionDeleteComponent };
if (false) {
    /** @type {?} */
    SubmissionDeleteComponent.prototype.service;
    /** @type {?} */
    SubmissionDeleteComponent.prototype.router;
    /** @type {?} */
    SubmissionDeleteComponent.prototype.route;
    /** @type {?} */
    SubmissionDeleteComponent.prototype.alerts;
}
