/**
 * @fileoverview added by tsickle
 * Generated from: FormioBaseComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Output, EventEmitter, Optional, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAppConfig } from './formio.config';
import { isEmpty, get, assign } from 'lodash';
import { CustomTagsService } from './custom-component/custom-tags.service';
import Evaluator from '../formiojs/utils/Evaluator';
var FormioBaseComponent = /** @class */ (function () {
    function FormioBaseComponent(ngZone, loader, config, customTags) {
        var _this = this;
        this.ngZone = ngZone;
        this.loader = loader;
        this.config = config;
        this.customTags = customTags;
        this.submission = {};
        this.noeval = false;
        this.readOnly = false;
        this.viewOnly = false;
        this.hooks = {};
        this.render = new EventEmitter();
        this.customEvent = new EventEmitter();
        this.submit = new EventEmitter();
        this.prevPage = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.beforeSubmit = new EventEmitter();
        this.change = new EventEmitter();
        this.invalid = new EventEmitter();
        this.errorChange = new EventEmitter();
        this.formLoad = new EventEmitter();
        this.submissionLoad = new EventEmitter();
        this.ready = new EventEmitter();
        this.initialized = false;
        this.alerts = new FormioAlerts();
        this.submitting = false;
        this.formioReady = new Promise((/**
         * @param {?} ready
         * @return {?}
         */
        function (ready) {
            _this.formioReadyResolve = ready;
        }));
    }
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRenderer = /**
     * @return {?}
     */
    function () {
        return this.renderer;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.getRendererOptions = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        return assign({}, {
            icons: get(this.config, 'icons', 'fontawesome'),
            noAlerts: get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            i18n: get(this.options, 'i18n', null),
            fileService: get(this.options, 'fileService', null),
            hooks: this.hooks,
            sanitizeConfig: {
                addTags: extraTags
            }
        }, this.renderOptions || {});
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.createRenderer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var Renderer = this.getRenderer();
        /** @type {?} */
        var form = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null, this.form, this.getRendererOptions()));
        return form.instance;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FormioBaseComponent.prototype.setForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        var _this = this;
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        this.formio = this.createRenderer();
        this.formio.submission = this.submission;
        if (this.url) {
            this.formio.setUrl(this.url, this.formioOptions || {});
        }
        if (this.src) {
            this.formio.setUrl(this.src, this.formioOptions || {});
        }
        this.formio.nosubmit = true;
        this.formio.on('prevPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onPrevPage(data); })); }));
        this.formio.on('nextPage', (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onNextPage(data); })); }));
        this.formio.on('change', (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.change.emit(value); })); }));
        this.formio.on('customEvent', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.customEvent.emit(event); }));
        }));
        this.formio.on('submit', (/**
         * @param {?} submission
         * @return {?}
         */
        function (submission) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.submitForm(submission); }));
        }));
        this.formio.on('error', (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.onError(err); })); }));
        this.formio.on('render', (/**
         * @return {?}
         */
        function () { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return _this.render.emit(); })); }));
        this.formio.on('formLoad', (/**
         * @param {?} loadedForm
         * @return {?}
         */
        function (loadedForm) {
            return _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.formLoad.emit(loadedForm); }));
        }));
        return this.formio.ready.then((/**
         * @return {?}
         */
        function () {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.loader.setLoading(false);
                _this.ready.emit(_this);
                _this.formioReadyResolve(_this.formio);
                if (_this.formio.submissionReady) {
                    _this.formio.submissionReady.then((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        _this.submissionLoad.emit(submission);
                    }));
                }
            }));
            return _this.formio;
        }));
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.initialize = /**
     * @return {?}
     */
    function () {
        if (this.initialized) {
            return;
        }
        /** @type {?} */
        var extraTags = this.customTags ? this.customTags.tags : [];
        this.options = Object.assign({
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            disableAlerts: false,
            hooks: {
                beforeSubmit: null
            },
            sanitizeConfig: {
                addTags: extraTags
            }
        }, this.options);
        this.initialized = true;
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (this.language) {
            this.language.subscribe((/**
             * @param {?} lang
             * @return {?}
             */
            function (lang) {
                _this.formio.language = lang;
            }));
        }
        if (this.refresh) {
            this.refresh.subscribe((/**
             * @param {?} refresh
             * @return {?}
             */
            function (refresh) {
                return _this.onRefresh(refresh);
            }));
        }
        if (this.error) {
            this.error.subscribe((/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.success) {
            this.success.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.alerts.setAlert({
                    type: 'success',
                    message: message || get(_this.options, 'alerts.submitMessage')
                });
            }));
        }
        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.loader.setLoading(true);
            this.service.loadForm({ params: { live: 1 } }).subscribe((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                if (form && form.components) {
                    _this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () {
                        _this.setForm(form);
                    }));
                }
                // if a submission is also provided.
                if (isEmpty(_this.submission) &&
                    _this.service &&
                    _this.service.formio.submissionId) {
                    _this.service.loadSubmission().subscribe((/**
                     * @param {?} submission
                     * @return {?}
                     */
                    function (submission) {
                        if (_this.readOnly) {
                            _this.formio.options.readOnly = true;
                        }
                        _this.submission = _this.formio.submission = submission;
                    }), (/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) { return _this.onError(err); }));
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    };
    /**
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.formio) {
            this.formio.destroy();
        }
    };
    /**
     * @param {?} refresh
     * @return {?}
     */
    FormioBaseComponent.prototype.onRefresh = /**
     * @param {?} refresh
     * @return {?}
     */
    function (refresh) {
        var _this = this;
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (refresh.form) {
                _this.formio.setForm(refresh.form).then((/**
                 * @return {?}
                 */
                function () {
                    if (refresh.submission) {
                        _this.formio.setSubmission(refresh.submission);
                    }
                }));
            }
            else if (refresh.submission) {
                _this.formio.setSubmission(refresh.submission);
            }
            else {
                switch (refresh.property) {
                    case 'submission':
                        _this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        _this.formio.form = refresh.value;
                        break;
                }
            }
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormioBaseComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.setForm(changes.form.currentValue);
            }));
        }
        this.formioReady.then((/**
         * @return {?}
         */
        function () {
            if (changes.submission && changes.submission.currentValue) {
                _this.formio.submission = changes.submission.currentValue;
            }
            if (changes.hideComponents && changes.hideComponents.currentValue) {
                /** @type {?} */
                var hiddenComponents_1 = changes.hideComponents.currentValue;
                _this.formio.options.hide = hiddenComponents_1;
                _this.formio.everyComponent((/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) {
                    component.options.hide = hiddenComponents_1;
                    if (hiddenComponents_1.includes(component.component.key)) {
                        component.visible = false;
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onPrevPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    FormioBaseComponent.prototype.onNextPage = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    };
    /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    FormioBaseComponent.prototype.onSubmit = /**
     * @param {?} submission
     * @param {?} saved
     * @param {?=} noemit
     * @return {?}
     */
    function (submission, saved, noemit) {
        this.submitting = false;
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit(submission);
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    };
    /**
     * @param {?} err
     * @return {?}
     */
    FormioBaseComponent.prototype.onError = /**
     * @param {?} err
     * @return {?}
     */
    function (err) {
        var _this = this;
        this.alerts.setAlerts([]);
        this.submitting = false;
        this.loader.setLoading(false);
        if (!err) {
            return;
        }
        // Make sure it is an array.
        /** @type {?} */
        var errors = Array.isArray(err) ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(errors);
        if (err.silent) {
            return;
        }
        if (this.formio) {
            this.formio.emit('submitError', errors);
        }
        // Iterate through each one and set the alerts array.
        errors.forEach((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            var _a = error
                ? error.details
                    ? {
                        message: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.message; })).join(' '),
                        paths: error.details.map((/**
                         * @param {?} detail
                         * @return {?}
                         */
                        function (detail) { return detail.path; })),
                    }
                    : {
                        message: error.message || error.toString(),
                        paths: error.path ? [error.path] : [],
                    }
                : {
                    message: '',
                    paths: [],
                }, message = _a.message, paths = _a.paths;
            _this.alerts.addAlert({
                type: 'danger',
                message: message,
                component: error.component,
            });
            if (_this.formio) {
                paths.forEach((/**
                 * @param {?} path
                 * @return {?}
                 */
                function (path) {
                    /** @type {?} */
                    var component = _this.formio.getComponent(path);
                    if (component) {
                        /** @type {?} */
                        var components = Array.isArray(component) ? component : [component];
                        components.forEach((/**
                         * @param {?} comp
                         * @return {?}
                         */
                        function (comp) { return comp.setCustomValidity(message, true); }));
                    }
                }));
            }
        }));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    FormioBaseComponent.prototype.focusOnComponet = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (this.formio) {
            this.formio.focusOnComponent(key);
        }
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioBaseComponent.prototype.submitExecute = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        if (this.service && !this.url) {
            this.service
                .saveSubmission(submission)
                .subscribe((/**
             * @param {?} sub
             * @return {?}
             */
            function (sub) { return _this.onSubmit(sub, true); }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) { return _this.onError(err); }));
        }
        else {
            this.onSubmit(submission, false);
        }
    };
    /**
     * @param {?} submission
     * @return {?}
     */
    FormioBaseComponent.prototype.submitForm = /**
     * @param {?} submission
     * @return {?}
     */
    function (submission) {
        var _this = this;
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        /** @type {?} */
        var beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (/**
             * @param {?} err
             * @param {?} sub
             * @return {?}
             */
            function (err, sub) {
                if (err) {
                    _this.onError(err);
                    return;
                }
                _this.submitExecute(sub);
            }));
        }
        else {
            this.submitExecute(submission);
        }
    };
    /** @nocollapse */
    FormioBaseComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: FormioLoader },
        { type: FormioAppConfig, decorators: [{ type: Optional }] },
        { type: CustomTagsService, decorators: [{ type: Optional }] }
    ]; };
    FormioBaseComponent.propDecorators = {
        form: [{ type: Input }],
        submission: [{ type: Input }],
        src: [{ type: Input }],
        url: [{ type: Input }],
        service: [{ type: Input }],
        options: [{ type: Input }],
        noeval: [{ type: Input }],
        formioOptions: [{ type: Input }],
        renderOptions: [{ type: Input }],
        readOnly: [{ type: Input }],
        viewOnly: [{ type: Input }],
        hideComponents: [{ type: Input }],
        refresh: [{ type: Input }],
        error: [{ type: Input }],
        success: [{ type: Input }],
        language: [{ type: Input }],
        hooks: [{ type: Input }],
        renderer: [{ type: Input }],
        render: [{ type: Output }],
        customEvent: [{ type: Output }],
        submit: [{ type: Output }],
        prevPage: [{ type: Output }],
        nextPage: [{ type: Output }],
        beforeSubmit: [{ type: Output }],
        change: [{ type: Output }],
        invalid: [{ type: Output }],
        errorChange: [{ type: Output }],
        formLoad: [{ type: Output }],
        submissionLoad: [{ type: Output }],
        ready: [{ type: Output }],
        formioElement: [{ type: ViewChild, args: ['formio', { static: true },] }]
    };
    return FormioBaseComponent;
}());
export { FormioBaseComponent };
if (false) {
    /** @type {?} */
    FormioBaseComponent.prototype.form;
    /** @type {?} */
    FormioBaseComponent.prototype.submission;
    /** @type {?} */
    FormioBaseComponent.prototype.src;
    /** @type {?} */
    FormioBaseComponent.prototype.url;
    /** @type {?} */
    FormioBaseComponent.prototype.service;
    /** @type {?} */
    FormioBaseComponent.prototype.options;
    /** @type {?} */
    FormioBaseComponent.prototype.noeval;
    /** @type {?} */
    FormioBaseComponent.prototype.formioOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.renderOptions;
    /** @type {?} */
    FormioBaseComponent.prototype.readOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.viewOnly;
    /** @type {?} */
    FormioBaseComponent.prototype.hideComponents;
    /** @type {?} */
    FormioBaseComponent.prototype.refresh;
    /** @type {?} */
    FormioBaseComponent.prototype.error;
    /** @type {?} */
    FormioBaseComponent.prototype.success;
    /** @type {?} */
    FormioBaseComponent.prototype.language;
    /** @type {?} */
    FormioBaseComponent.prototype.hooks;
    /** @type {?} */
    FormioBaseComponent.prototype.renderer;
    /** @type {?} */
    FormioBaseComponent.prototype.render;
    /** @type {?} */
    FormioBaseComponent.prototype.customEvent;
    /** @type {?} */
    FormioBaseComponent.prototype.submit;
    /** @type {?} */
    FormioBaseComponent.prototype.prevPage;
    /** @type {?} */
    FormioBaseComponent.prototype.nextPage;
    /** @type {?} */
    FormioBaseComponent.prototype.beforeSubmit;
    /** @type {?} */
    FormioBaseComponent.prototype.change;
    /** @type {?} */
    FormioBaseComponent.prototype.invalid;
    /** @type {?} */
    FormioBaseComponent.prototype.errorChange;
    /** @type {?} */
    FormioBaseComponent.prototype.formLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.submissionLoad;
    /** @type {?} */
    FormioBaseComponent.prototype.ready;
    /** @type {?} */
    FormioBaseComponent.prototype.formioElement;
    /** @type {?} */
    FormioBaseComponent.prototype.formio;
    /** @type {?} */
    FormioBaseComponent.prototype.initialized;
    /** @type {?} */
    FormioBaseComponent.prototype.alerts;
    /** @type {?} */
    FormioBaseComponent.prototype.formioReady;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.formioReadyResolve;
    /**
     * @type {?}
     * @private
     */
    FormioBaseComponent.prototype.submitting;
    /** @type {?} */
    FormioBaseComponent.prototype.ngZone;
    /** @type {?} */
    FormioBaseComponent.prototype.loader;
    /** @type {?} */
    FormioBaseComponent.prototype.config;
    /** @type {?} */
    FormioBaseComponent.prototype.customTags;
}
