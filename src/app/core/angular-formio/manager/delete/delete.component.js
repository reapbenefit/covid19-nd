/**
 * @fileoverview added by tsickle
 * Generated from: manager/delete/delete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '../../components/alerts/formio.alerts';
var FormManagerDeleteComponent = /** @class */ (function () {
    function FormManagerDeleteComponent(service, router, route, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
    }
    /**
     * @return {?}
     */
    FormManagerDeleteComponent.prototype.onDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.formio.deleteForm().then((/**
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
    FormManagerDeleteComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    };
    FormManagerDeleteComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts> <h3>Are you sure you wish to delete this form?</h3> <div class=\"btn-toolbar\"> <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button> <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button> </div> "
                },] },
    ];
    /** @nocollapse */
    FormManagerDeleteComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: Router },
        { type: ActivatedRoute },
        { type: FormioAlerts }
    ]; };
    return FormManagerDeleteComponent;
}());
export { FormManagerDeleteComponent };
if (false) {
    /** @type {?} */
    FormManagerDeleteComponent.prototype.service;
    /** @type {?} */
    FormManagerDeleteComponent.prototype.router;
    /** @type {?} */
    FormManagerDeleteComponent.prototype.route;
    /** @type {?} */
    FormManagerDeleteComponent.prototype.alerts;
}
