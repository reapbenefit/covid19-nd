/**
 * @fileoverview added by tsickle
 * Generated from: components/alerts/formio.alerts.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
var FormioAlertsComponent = /** @class */ (function () {
    function FormioAlertsComponent() {
        this.focusComponent = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FormioAlertsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.alerts) {
            this.alerts = new FormioAlerts();
        }
    };
    /**
     * @param {?} event
     * @param {?} alert
     * @return {?}
     */
    FormioAlertsComponent.prototype.getComponent = /**
     * @param {?} event
     * @param {?} alert
     * @return {?}
     */
    function (event, alert) {
        this.focusComponent.emit(alert.component.key);
    };
    FormioAlertsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'formio-alerts',
                    template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">{{ alert.message }}</div> "
                },] },
    ];
    FormioAlertsComponent.propDecorators = {
        alerts: [{ type: Input }],
        focusComponent: [{ type: Output }]
    };
    return FormioAlertsComponent;
}());
export { FormioAlertsComponent };
if (false) {
    /** @type {?} */
    FormioAlertsComponent.prototype.alerts;
    /** @type {?} */
    FormioAlertsComponent.prototype.focusComponent;
}
