/**
 * @fileoverview added by tsickle
 * Generated from: components/alerts/formio.alerts.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function FormioAlert() { }
if (false) {
    /** @type {?} */
    FormioAlert.prototype.type;
    /** @type {?} */
    FormioAlert.prototype.message;
    /** @type {?|undefined} */
    FormioAlert.prototype.component;
}
var FormioAlerts = /** @class */ (function () {
    function FormioAlerts() {
        this.alerts = [];
    }
    /**
     * @param {?} alert
     * @return {?}
     */
    FormioAlerts.prototype.setAlert = /**
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts = [alert];
    };
    /**
     * @param {?} alert
     * @return {?}
     */
    FormioAlerts.prototype.addAlert = /**
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts.push(alert);
    };
    /**
     * @param {?} alerts
     * @return {?}
     */
    FormioAlerts.prototype.setAlerts = /**
     * @param {?} alerts
     * @return {?}
     */
    function (alerts) {
        this.alerts = alerts;
    };
    return FormioAlerts;
}());
export { FormioAlerts };
if (false) {
    /** @type {?} */
    FormioAlerts.prototype.alerts;
}
