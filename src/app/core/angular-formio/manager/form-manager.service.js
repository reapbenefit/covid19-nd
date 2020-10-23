/**
 * @fileoverview added by tsickle
 * Generated from: manager/form-manager.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormioAppConfig } from '../formio.config';
import { FormManagerConfig } from './form-manager.config';
import { Formio } from '../../formiojs';
import { FormioAuthService } from '../auth/auth.service';
import _each from 'lodash/each';
import _intersection from 'lodash/intersection';
var FormManagerService = /** @class */ (function () {
    function FormManagerService(appConfig, config, auth) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.auth = auth;
        this.form = null;
        this.perms = { delete: false, edit: false };
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.allAccessMap = {
            'update_all': 'formEdit',
            'delete_all': 'formDelete'
        };
        this.ownAccessMap = {
            'update_own': 'formEdit',
            'delete_own': 'formDelete'
        };
        this.actionAllowed = (/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return _this.isActionAllowed(action); });
        this.reset();
    }
    /**
     * @param {?} action
     * @return {?}
     */
    FormManagerService.prototype.isActionAllowed = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        return this.access[action];
    };
    /**
     * @return {?}
     */
    FormManagerService.prototype.setAccess = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.access = {
            formCreate: true,
            formView: true,
            formEdit: true,
            formDelete: true,
            submissionIndex: true
        };
        if (this.auth) {
            this.access = {
                formCreate: false,
                formView: false,
                formEdit: false,
                formDelete: false,
                submissionIndex: false
            };
            this.ready = this.auth.ready.then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var adminRoles = [];
                _each(_this.auth.roles, (/**
                 * @param {?} role
                 * @param {?} name
                 * @return {?}
                 */
                function (role, name) {
                    if (role.admin) {
                        adminRoles.push(role._id);
                    }
                }));
                if (_this.auth.user && _this.auth.user.roles) {
                    _this.auth.user.roles.forEach((/**
                     * @param {?} roleId
                     * @return {?}
                     */
                    function (roleId) {
                        if (adminRoles.indexOf(roleId) !== -1) {
                            _this.access.formCreate = true;
                            _this.access.formView = true;
                            _this.access.formEdit = true;
                            _this.access.formDelete = true;
                            _this.access.submissionIndex = true;
                        }
                        if (!_this.access.formCreate) {
                            _this.access.formCreate = (_this.auth.formAccess.create_all.indexOf(roleId) !== -1);
                        }
                        if (!_this.access.formView) {
                            _this.access.formView = (_this.auth.formAccess.read_all.indexOf(roleId) !== -1);
                        }
                        if (!_this.access.formEdit) {
                            _this.access.formEdit = (_this.auth.formAccess.update_all.indexOf(roleId) !== -1);
                        }
                        if (!_this.access.formDelete) {
                            _this.access.formDelete = (_this.auth.formAccess.delete_all.indexOf(roleId) !== -1);
                        }
                        if (!_this.access.submissionIndex) {
                            _this.access.submissionIndex = (_this.auth.formAccess.read_all.indexOf(roleId) !== -1);
                        }
                    }));
                }
            }));
        }
        else {
            this.ready = Promise.resolve(false);
        }
    };
    /**
     * @param {?=} route
     * @return {?}
     */
    FormManagerService.prototype.reset = /**
     * @param {?=} route
     * @return {?}
     */
    function (route) {
        var _this = this;
        if (route) {
            route.params.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                if (params.id) {
                    _this.formio = new Formio(_this.formio.formsUrl + "/" + params.id);
                }
                else {
                    _this.reset();
                }
            }));
        }
        else {
            this.formio = new Formio(this.appConfig.appUrl);
            this.setAccess();
        }
    };
    /**
     * @param {?} roles
     * @return {?}
     */
    FormManagerService.prototype.hasAccess = /**
     * @param {?} roles
     * @return {?}
     */
    function (roles) {
        if (!this.auth.user) {
            return false;
        }
        return !!_intersection(roles, this.auth.user.roles).length;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormManagerService.prototype.setForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.form = form;
        if (form.access) {
            // Check if they have access here.
            form.access.forEach((/**
             * @param {?} access
             * @return {?}
             */
            function (access) {
                // Check for all access.
                if (_this.allAccessMap[access.type] && !_this.access[_this.allAccessMap[access.type]]) {
                    _this.access[_this.allAccessMap[access.type]] = _this.hasAccess(access.roles);
                }
                // Check for own access.
                if (_this.auth && _this.auth.user &&
                    (form._id === _this.auth.user._id) &&
                    _this.ownAccessMap[access.type] &&
                    !_this.access[_this.ownAccessMap[access.type]]) {
                    _this.access[_this.ownAccessMap[access.type]] = _this.hasAccess(access.roles);
                }
            }));
        }
        return form;
    };
    /**
     * @return {?}
     */
    FormManagerService.prototype.loadForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.formio.loadForm().then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) { return _this.setForm(form); }));
    };
    /**
     * @param {?} route
     * @return {?}
     */
    FormManagerService.prototype.setSubmission = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            route.params.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                _this.formio = new Formio(_this.formio.submissionsUrl + "/" + params.id);
                resolve(_this.formio);
            }));
        }));
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormManagerService.prototype.submissionLoaded = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        this.auth.ready.then((/**
         * @return {?}
         */
        function () {
            _this.formio.userPermissions(_this.auth.user, _this.form, submission).then((/**
             * @param {?} perms
             * @return {?}
             */
            function (perms) {
                _this.perms.delete = perms.delete;
                _this.perms.edit = perms.edit;
            }));
        }));
    };
    /**
     * @return {?}
     */
    FormManagerService.prototype.loadForms = /**
     * @return {?}
     */
    function () {
        return this.formio.loadForms({ params: {
                tags: this.config.tag
            } });
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormManagerService.prototype.createForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return this.formio.createform(form);
    };
    FormManagerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormManagerService.ctorParameters = function () { return [
        { type: FormioAppConfig },
        { type: FormManagerConfig },
        { type: FormioAuthService }
    ]; };
    return FormManagerService;
}());
export { FormManagerService };
if (false) {
    /** @type {?} */
    FormManagerService.prototype.formio;
    /** @type {?} */
    FormManagerService.prototype.access;
    /** @type {?} */
    FormManagerService.prototype.allAccessMap;
    /** @type {?} */
    FormManagerService.prototype.ownAccessMap;
    /** @type {?} */
    FormManagerService.prototype.ready;
    /** @type {?} */
    FormManagerService.prototype.actionAllowed;
    /** @type {?} */
    FormManagerService.prototype.form;
    /** @type {?} */
    FormManagerService.prototype.perms;
    /** @type {?} */
    FormManagerService.prototype.appConfig;
    /** @type {?} */
    FormManagerService.prototype.config;
    /** @type {?} */
    FormManagerService.prototype.auth;
}
