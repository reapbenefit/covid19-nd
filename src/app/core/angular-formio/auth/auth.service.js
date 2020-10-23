/**
 * @fileoverview added by tsickle
 * Generated from: auth/auth.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Injectable } from '@angular/core';
import { FormioAuthConfig } from './auth.config';
import { FormioAppConfig } from '../formio.config';
import { get, each } from 'lodash';
import { Formio } from '../../formiojs';
var FormioAuthService = /** @class */ (function () {
    function FormioAuthService(appConfig, config) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.authenticated = false;
        this.formAccess = {};
        this.submissionAccess = {};
        this.is = {};
        this.user = null;
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.loginForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'login.form', 'user/login');
        this.registerForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'register.form', 'user/register');
        this.onLogin = new EventEmitter();
        this.onLogout = new EventEmitter();
        this.onRegister = new EventEmitter();
        this.onUser = new EventEmitter();
        this.onError = new EventEmitter();
        this.ready = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.readyResolve = resolve;
            _this.readyReject = reject;
        }));
        // Register for the core events.
        Formio.events.on('formio.badToken', (/**
         * @return {?}
         */
        function () { return _this.logoutError(); }));
        Formio.events.on('formio.sessionExpired', (/**
         * @return {?}
         */
        function () { return _this.logoutError(); }));
        if (!this.config.delayAuth) {
            this.init();
        }
    }
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioAuthService.prototype.onLoginSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        this.setUser(submission);
        this.onLogin.emit(submission);
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioAuthService.prototype.onRegisterSubmit = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        this.setUser(submission);
        this.onRegister.emit(submission);
    };
    /**
     * @return {?}
     */
    FormioAuthService.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.projectReady = Formio.makeStaticRequest(this.appConfig.appUrl).then((/**
         * @param {?} project
         * @return {?}
         */
        function (project) {
            each(project.access, (/**
             * @param {?} access
             * @return {?}
             */
            function (access) {
                _this.formAccess[access.type] = access.roles;
            }));
        }), (/**
         * @return {?}
         */
        function () {
            _this.formAccess = {};
            return null;
        }));
        // Get the access for this project.
        this.accessReady = Formio.makeStaticRequest(this.appConfig.appUrl + '/access').then((/**
         * @param {?} access
         * @return {?}
         */
        function (access) {
            each(access.forms, (/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                _this.submissionAccess[form.name] = {};
                form.submissionAccess.forEach((/**
                 * @param {?} subAccess
                 * @return {?}
                 */
                function (subAccess) {
                    _this.submissionAccess[form.name][subAccess.type] = subAccess.roles;
                }));
            }));
            _this.roles = access.roles;
            return access;
        }), (/**
         * @return {?}
         */
        function () {
            _this.roles = {};
            return null;
        }));
        /** @type {?} */
        var currentUserPromise;
        if (this.config.oauth) {
            // Make a fix to the hash to remove starting "/" that angular might put there.
            if (window.location.hash && window.location.hash.match(/^#\/access_token/)) {
                history.pushState(null, null, window.location.hash.replace(/^#\/access_token/, '#access_token'));
            }
            // Initiate the SSO if they provide oauth settings.
            currentUserPromise = Formio.ssoInit(this.config.oauth.type, this.config.oauth.options);
        }
        else {
            currentUserPromise = Formio.currentUser();
        }
        this.userReady = currentUserPromise.then((/**
         * @param {?} user
         * @return {?}
         */
        function (user) {
            _this.setUser(user);
            return user;
        }));
        // Trigger we are redy when all promises have resolved.
        if (this.accessReady) {
            this.accessReady
                .then((/**
             * @return {?}
             */
            function () { return _this.projectReady; }))
                .then((/**
             * @return {?}
             */
            function () { return _this.userReady; }))
                .then((/**
             * @return {?}
             */
            function () { return _this.readyResolve(true); }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.readyReject(err); }));
        }
    };
    /**
     * @param {?} user
     * @return {?}
     */
    FormioAuthService.prototype.setUser = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var namespace = Formio.namespace || 'formio';
        if (user) {
            this.user = user;
            localStorage.setItem(namespace + "AppUser", JSON.stringify(user));
            this.setUserRoles();
        }
        else {
            this.user = null;
            this.is = {};
            localStorage.removeItem(namespace + "AppUser");
            Formio.clearCache();
            Formio.setUser(null);
        }
        this.authenticated = !!Formio.getToken();
        this.onUser.emit(this.user);
    };
    /**
     * @return {?}
     */
    FormioAuthService.prototype.setUserRoles = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.accessReady) {
            this.accessReady.then((/**
             * @return {?}
             */
            function () {
                each(_this.roles, (/**
                 * @param {?} role
                 * @param {?} roleName
                 * @return {?}
                 */
                function (role, roleName) {
                    if (_this.user.roles.indexOf(role._id) !== -1) {
                        _this.is[roleName] = true;
                    }
                }));
            }));
        }
    };
    /**
     * @return {?}
     */
    FormioAuthService.prototype.logoutError = /**
     * @return {?}
     */
    function () {
        this.setUser(null);
        localStorage.removeItem('formioToken');
        this.onError.emit();
    };
    /**
     * @return {?}
     */
    FormioAuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setUser(null);
        localStorage.removeItem('formioToken');
        Formio.logout()
            .then((/**
         * @return {?}
         */
        function () { return _this.onLogout.emit(); }))
            .catch((/**
         * @return {?}
         */
        function () { return _this.logoutError(); }));
    };
    FormioAuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormioAuthService.ctorParameters = function () { return [
        { type: FormioAppConfig },
        { type: FormioAuthConfig }
    ]; };
    return FormioAuthService;
}());
export { FormioAuthService };
if (false) {
    /** @type {?} */
    FormioAuthService.prototype.user;
    /** @type {?} */
    FormioAuthService.prototype.authenticated;
    /** @type {?} */
    FormioAuthService.prototype.loginForm;
    /** @type {?} */
    FormioAuthService.prototype.onLogin;
    /** @type {?} */
    FormioAuthService.prototype.onLogout;
    /** @type {?} */
    FormioAuthService.prototype.registerForm;
    /** @type {?} */
    FormioAuthService.prototype.onRegister;
    /** @type {?} */
    FormioAuthService.prototype.onUser;
    /** @type {?} */
    FormioAuthService.prototype.onError;
    /** @type {?} */
    FormioAuthService.prototype.ready;
    /** @type {?} */
    FormioAuthService.prototype.readyResolve;
    /** @type {?} */
    FormioAuthService.prototype.readyReject;
    /** @type {?} */
    FormioAuthService.prototype.projectReady;
    /** @type {?} */
    FormioAuthService.prototype.accessReady;
    /** @type {?} */
    FormioAuthService.prototype.userReady;
    /** @type {?} */
    FormioAuthService.prototype.formAccess;
    /** @type {?} */
    FormioAuthService.prototype.submissionAccess;
    /** @type {?} */
    FormioAuthService.prototype.roles;
    /** @type {?} */
    FormioAuthService.prototype.is;
    /** @type {?} */
    FormioAuthService.prototype.appConfig;
    /** @type {?} */
    FormioAuthService.prototype.config;
}
