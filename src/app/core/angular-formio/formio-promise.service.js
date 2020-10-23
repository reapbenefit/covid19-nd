/**
 * @fileoverview added by tsickle
 * Generated from: formio-promise.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormioService } from './index';
var FormioPromiseService = /** @class */ (function () {
    function FormioPromiseService(url, options) {
        this.url = url;
        this.options = options;
        this.formioService = new FormioService(url, options);
    }
    /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.saveForm = /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    function (form, options) {
        return this.formioService.saveForm(form, options).toPromise();
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.loadForm = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        return this.formioService.loadForm(query, options).toPromise();
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.loadSubmission = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        return this.formioService.loadSubmission(query, options).toPromise();
    };
    /**
     * @param {?} user
     * @param {?} form
     * @param {?} submission
     * @return {?}
     */
    FormioPromiseService.prototype.userPermissions = /**
     * @param {?} user
     * @param {?} form
     * @param {?} submission
     * @return {?}
     */
    function (user, form, submission) {
        return this.formioService.userPermissions(user, form, submission).toPromise();
    };
    /**
     * @param {?=} data
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.deleteSubmission = /**
     * @param {?=} data
     * @param {?=} options
     * @return {?}
     */
    function (data, options) {
        return this.formioService.deleteSubmission(data, options).toPromise();
    };
    /**
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.loadForms = /**
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        return this.formioService.loadForms(query, options).toPromise();
    };
    /**
     * @param {?} submission
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.saveSubmission = /**
     * @param {?} submission
     * @param {?=} options
     * @return {?}
     */
    function (submission, options) {
        return this.formioService.saveSubmission(submission, options).toPromise();
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioPromiseService.prototype.loadSubmissions = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        return this.formioService.loadSubmissions(query, options).toPromise();
    };
    return FormioPromiseService;
}());
export { FormioPromiseService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FormioPromiseService.prototype.formioService;
    /** @type {?} */
    FormioPromiseService.prototype.url;
    /** @type {?} */
    FormioPromiseService.prototype.options;
}
