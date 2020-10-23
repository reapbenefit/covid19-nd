/**
 * @fileoverview added by tsickle
 * Generated from: manager/edit/edit.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManagerConfig } from '../form-manager.config';
import { FormioAlerts } from '../../components/alerts/formio.alerts';
import { FormBuilderComponent } from '../../components/formbuilder/formbuilder.component';
import _ from 'lodash';
var FormManagerEditComponent = /** @class */ (function () {
    function FormManagerEditComponent(service, router, route, config, ref, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.ref = ref;
        this.alerts = alerts;
        this.form = { components: [] };
        this.formReady = false;
        this.loading = false;
        this.editMode = false;
    }
    /**
     * @param {?} editing
     * @return {?}
     */
    FormManagerEditComponent.prototype.initBuilder = /**
     * @param {?} editing
     * @return {?}
     */
    function (editing) {
        var _this = this;
        if (editing) {
            this.loading = true;
            this.editMode = true;
            return this.service.loadForm().then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                _this.form = form;
                _this.formTitle.nativeElement.value = form.title;
                _this.formType.nativeElement.value = form.display || 'form';
                _this.loading = false;
                _this.formReady = true;
                _this.ref.detectChanges();
                return true;
            })).catch((/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                _this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
                _this.loading = false;
                _this.formReady = true;
            }));
        }
        else {
            this.formReady = true;
            return Promise.resolve(true);
        }
    };
    /**
     * @return {?}
     */
    FormManagerEditComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.url.subscribe((/**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            _this.initBuilder((url[0].path === 'edit'));
        }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FormManagerEditComponent.prototype.onDisplaySelect = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.builder.setDisplay(event.target.value);
    };
    /**
     * @return {?}
     */
    FormManagerEditComponent.prototype.saveForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.loading = true;
        this.form.title = this.formTitle.nativeElement.value;
        this.form.display = this.formType.nativeElement.value;
        this.form.components = this.builder.formio.schema.components;
        if (this.config.tag) {
            this.form.tags = this.form.tags || [];
            this.form.tags.push(this.config.tag);
            this.form.tags = _.uniq(this.form.tags);
        }
        if (!this.form._id) {
            this.form.name = _.camelCase(this.form.title).toLowerCase();
            this.form.path = this.form.name;
        }
        return this.service.formio.saveForm(this.form).then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            _this.form = _this.service.setForm(form);
            _this.loading = false;
            return _this.form;
        })).catch((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            _this.loading = false;
            // Catch if a form is returned as an error. This is a conflict.
            if (err._id && err.type) {
                throw err;
            }
            _this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
        }));
    };
    /**
     * @return {?}
     */
    FormManagerEditComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.saveForm().then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            if (_this.editMode) {
                _this.router.navigate(['../', 'view'], { relativeTo: _this.route });
            }
            else {
                _this.router.navigate(['../', form._id, 'view'], { relativeTo: _this.route });
            }
        }));
    };
    FormManagerEditComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"loader\" *ngIf=\"loading\"></div> <div class=\"form-group row\"> <div class=\"col-sm-8\"> <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title> </div> <div class=\"col-sm-2\"> <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type> <option value=\"form\">Form</option> <option value=\"wizard\">Wizard</option> <option value=\"pdf\">PDF</option> </select> </div> <div class=\"col-sm-2\"> <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button> </div> </div> <formio-alerts [alerts]=\"alerts\"></formio-alerts> <form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder> <button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button> "
                },] },
    ];
    /** @nocollapse */
    FormManagerEditComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: Router },
        { type: ActivatedRoute },
        { type: FormManagerConfig },
        { type: ChangeDetectorRef },
        { type: FormioAlerts }
    ]; };
    FormManagerEditComponent.propDecorators = {
        builder: [{ type: ViewChild, args: [FormBuilderComponent, { static: false },] }],
        formTitle: [{ type: ViewChild, args: ['title', { static: false },] }],
        formType: [{ type: ViewChild, args: ['type', { static: false },] }]
    };
    return FormManagerEditComponent;
}());
export { FormManagerEditComponent };
if (false) {
    /** @type {?} */
    FormManagerEditComponent.prototype.builder;
    /** @type {?} */
    FormManagerEditComponent.prototype.formTitle;
    /** @type {?} */
    FormManagerEditComponent.prototype.formType;
    /** @type {?} */
    FormManagerEditComponent.prototype.form;
    /** @type {?} */
    FormManagerEditComponent.prototype.loading;
    /** @type {?} */
    FormManagerEditComponent.prototype.formReady;
    /** @type {?} */
    FormManagerEditComponent.prototype.editMode;
    /** @type {?} */
    FormManagerEditComponent.prototype.service;
    /** @type {?} */
    FormManagerEditComponent.prototype.router;
    /** @type {?} */
    FormManagerEditComponent.prototype.route;
    /** @type {?} */
    FormManagerEditComponent.prototype.config;
    /** @type {?} */
    FormManagerEditComponent.prototype.ref;
    /** @type {?} */
    FormManagerEditComponent.prototype.alerts;
}
