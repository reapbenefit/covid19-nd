/**
 * @fileoverview added by tsickle
 * Generated from: resource/resource.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, EventEmitter, Injectable, Optional } from '@angular/core';
import { FormioResourceConfig } from './resource.config';
import { FormioResources } from './resources.service';
import { FormioPromiseService } from '../formio-promise.service';
import { FormioAlerts } from '../components/alerts/formio.alerts';
import { FormioLoader } from '../components/loader/formio.loader';
import { FormioAppConfig } from '../formio.config';
import Promise from 'native-promise-only';
import { Formio, Utils } from '../../formiojs';
import _ from 'lodash';
var FormioResourceService = /** @class */ (function () {
    function FormioResourceService(appConfig, config, loader, resourcesService, appRef) {
        var _this = this;
        this.appConfig = appConfig;
        this.config = config;
        this.loader = loader;
        this.resourcesService = resourcesService;
        this.appRef = appRef;
        this.initialized = false;
        this.alerts = new FormioAlerts();
        this.refresh = new EventEmitter();
        this.formLoaded = new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.formResolve = resolve;
            _this.formReject = reject;
        }));
        this.init();
    }
    /**
     * @return {?}
     */
    FormioResourceService.prototype.initialize = /**
     * @return {?}
     */
    function () {
        console.warn('FormioResourceService.initialize() has been deprecated.');
    };
    /**
     * @return {?}
     */
    FormioResourceService.prototype.init = /**
     * @return {?}
     */
    function () {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        // Create the form url and load the resources.
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.resource = { data: {} };
        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resources = this.resourcesService.resources;
            this.resources[this.config.name] = this;
        }
        return this.loadForm();
    };
    /**
     * @param {?} error
     * @return {?}
     */
    FormioResourceService.prototype.onError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.alerts.setAlert({
            type: 'danger',
            message: error.message || error
        });
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
        throw error;
    };
    /**
     * @param {?} err
     * @return {?}
     */
    FormioResourceService.prototype.onFormError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        this.formReject(err);
        this.onError(err);
    };
    /**
     * @param {?} route
     * @return {?}
     */
    FormioResourceService.prototype.setContext = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        this.resourceId = route.snapshot.params['id'];
        this.resource = { data: {} };
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        if (this.resourceId) {
            this.resourceUrl += '/submission/' + this.resourceId;
        }
        this.formio = new FormioPromiseService(this.resourceUrl);
        if (this.resourcesService) {
            this.resources[this.config.name] = this;
        }
        this.loadParents();
    };
    /**
     * @return {?}
     */
    FormioResourceService.prototype.loadForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.formFormio = new FormioPromiseService(this.formUrl);
        this.loader.setLoading(true);
        this.formLoading = this.formFormio
            .loadForm()
            .then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            _this.form = form;
            _this.formResolve(form);
            _this.loader.setLoading(false);
            _this.loadParents();
            return form;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onFormError(err); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onFormError(err); }));
        return this.formLoading;
    };
    /**
     * @return {?}
     */
    FormioResourceService.prototype.loadParents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.config.parents || !this.config.parents.length) {
            return Promise.resolve([]);
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return Promise.resolve([]);
        }
        return this.formLoading.then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            // Iterate through the list of parents.
            /** @type {?} */
            var _parentsLoaded = [];
            _this.config.parents.forEach((/**
             * @param {?} parent
             * @return {?}
             */
            function (parent) {
                /** @type {?} */
                var resourceName = parent.resource || parent;
                /** @type {?} */
                var resourceField = parent.field || parent;
                /** @type {?} */
                var filterResource = parent.hasOwnProperty('filter') ? parent.filter : true;
                if (_this.resources.hasOwnProperty(resourceName) && _this.resources[resourceName].resourceLoaded) {
                    _parentsLoaded.push(_this.resources[resourceName].resourceLoaded.then((/**
                     * @param {?} resource
                     * @return {?}
                     */
                    function (resource) {
                        /** @type {?} */
                        var parentPath = '';
                        Utils.eachComponent(form.components, (/**
                         * @param {?} component
                         * @param {?} path
                         * @return {?}
                         */
                        function (component, path) {
                            if (component.key === resourceField) {
                                component.hidden = true;
                                component.clearOnHide = false;
                                _.set(_this.resource.data, path, resource);
                                parentPath = path;
                                return true;
                            }
                        }));
                        return {
                            name: parentPath,
                            filter: filterResource,
                            resource: resource
                        };
                    })));
                }
            }));
            // When all the parents have loaded, emit that to the onParents emitter.
            return Promise.all(_parentsLoaded).then((/**
             * @param {?} parents
             * @return {?}
             */
            function (parents) {
                _this.refresh.emit({
                    form: form,
                    submission: _this.resource
                });
                return parents;
            }));
        }));
    };
    /**
     * @param {?} err
     * @return {?}
     */
    FormioResourceService.prototype.onSubmissionError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        this.onError(err);
    };
    /**
     * @param {?} route
     * @return {?}
     */
    FormioResourceService.prototype.loadResource = /**
     * @param {?} route
     * @return {?}
     */
    function (route) {
        var _this = this;
        this.setContext(route);
        this.loader.setLoading(true);
        this.resourceLoading = this.resourceLoaded = this.formio
            .loadSubmission(null, { ignoreCache: true })
            .then((/**
         * @param {?} resource
         * @return {?}
         */
        function (resource) {
            _this.resource = resource;
            _this.loader.setLoading(false);
            _this.refresh.emit({
                property: 'submission',
                value: _this.resource
            });
            return resource;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onSubmissionError(err); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onSubmissionError(err); }));
        return this.resourceLoading;
    };
    /**
     * @param {?} resource
     * @return {?}
     */
    FormioResourceService.prototype.save = /**
     * @param {?} resource
     * @return {?}
     */
    function (resource) {
        var _this = this;
        /** @type {?} */
        var formio = resource._id ? this.formio : this.formFormio;
        return formio
            .saveSubmission(resource)
            .then((/**
         * @param {?} saved
         * @return {?}
         */
        function (saved) {
            _this.resource = saved;
            return saved;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError(err); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError(err); }));
    };
    /**
     * @return {?}
     */
    FormioResourceService.prototype.remove = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.formio
            .deleteSubmission()
            .then((/**
         * @return {?}
         */
        function () {
            _this.resource = null;
        }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError(err); }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.onError(err); }));
    };
    FormioResourceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormioResourceService.ctorParameters = function () { return [
        { type: FormioAppConfig },
        { type: FormioResourceConfig },
        { type: FormioLoader },
        { type: FormioResources, decorators: [{ type: Optional }] },
        { type: ApplicationRef }
    ]; };
    return FormioResourceService;
}());
export { FormioResourceService };
if (false) {
    /** @type {?} */
    FormioResourceService.prototype.initialized;
    /** @type {?} */
    FormioResourceService.prototype.form;
    /** @type {?} */
    FormioResourceService.prototype.alerts;
    /** @type {?} */
    FormioResourceService.prototype.resource;
    /** @type {?} */
    FormioResourceService.prototype.resourceUrl;
    /** @type {?} */
    FormioResourceService.prototype.formUrl;
    /** @type {?} */
    FormioResourceService.prototype.formFormio;
    /** @type {?} */
    FormioResourceService.prototype.formio;
    /** @type {?} */
    FormioResourceService.prototype.refresh;
    /** @type {?} */
    FormioResourceService.prototype.resourceLoading;
    /** @type {?} */
    FormioResourceService.prototype.resourceLoaded;
    /** @type {?} */
    FormioResourceService.prototype.resourceId;
    /** @type {?} */
    FormioResourceService.prototype.resources;
    /** @type {?} */
    FormioResourceService.prototype.formLoading;
    /** @type {?} */
    FormioResourceService.prototype.formLoaded;
    /** @type {?} */
    FormioResourceService.prototype.formResolve;
    /** @type {?} */
    FormioResourceService.prototype.formReject;
    /** @type {?} */
    FormioResourceService.prototype.appConfig;
    /** @type {?} */
    FormioResourceService.prototype.config;
    /** @type {?} */
    FormioResourceService.prototype.loader;
    /** @type {?} */
    FormioResourceService.prototype.resourcesService;
    /** @type {?} */
    FormioResourceService.prototype.appRef;
}
