/**
 * @fileoverview added by tsickle
 * Generated from: formio.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
import { Formio } from '../formiojs';
var FormioService = /** @class */ (function () {
    function FormioService(url, options) {
        this.url = url;
        this.options = options;
        this.formio = new Formio(this.url, this.options);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    FormioService.prototype.requestWrapper = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        /** @type {?} */
        var record;
        /** @type {?} */
        var called = false;
        return Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            try {
                if (!called) {
                    called = true;
                    fn()
                        .then((/**
                     * @param {?} _record
                     * @return {?}
                     */
                    function (_record) {
                        record = _record;
                        observer.next(record);
                        observer.complete();
                    }))
                        .catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return observer.error(err); }));
                }
                else if (record) {
                    observer.next(record);
                    observer.complete();
                }
            }
            catch (err) {
                observer.error(err);
            }
        }));
    };
    /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.saveForm = /**
     * @param {?} form
     * @param {?=} options
     * @return {?}
     */
    function (form, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.saveForm(form, options); }));
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.loadForm = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.loadForm(query, options); }));
    };
    /**
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.loadForms = /**
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.loadForms(query, options); }));
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.loadSubmission = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.loadSubmission(query, options); }));
    };
    /**
     * @param {?} user
     * @param {?} form
     * @param {?} submission
     * @return {?}
     */
    FormioService.prototype.userPermissions = /**
     * @param {?} user
     * @param {?} form
     * @param {?} submission
     * @return {?}
     */
    function (user, form, submission) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.userPermissions(user, form, submission); }));
    };
    /**
     * @param {?=} data
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.deleteSubmission = /**
     * @param {?=} data
     * @param {?=} options
     * @return {?}
     */
    function (data, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.deleteSubmission(data, options); }));
    };
    /**
     * @param {?} submission
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.saveSubmission = /**
     * @param {?} submission
     * @param {?=} options
     * @return {?}
     */
    function (submission, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.saveSubmission(submission, options); }));
    };
    /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    FormioService.prototype.loadSubmissions = /**
     * @param {?=} query
     * @param {?=} options
     * @return {?}
     */
    function (query, options) {
        var _this = this;
        return this.requestWrapper((/**
         * @return {?}
         */
        function () { return _this.formio.loadSubmissions(query, options); }));
    };
    return FormioService;
}());
export { FormioService };
if (false) {
    /** @type {?} */
    FormioService.prototype.formio;
    /** @type {?} */
    FormioService.prototype.url;
    /** @type {?} */
    FormioService.prototype.options;
}
