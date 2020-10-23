/**
 * @fileoverview added by tsickle
 * Generated from: manager/form/form.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { ActivatedRoute } from '@angular/router';
import { FormioAppConfig } from '../../formio.config';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Formio } from '../../../formiojs';
var FormManagerFormComponent = /** @class */ (function () {
    function FormManagerFormComponent(service, route, appConfig, options, modalService) {
        this.service = service;
        this.route = route;
        this.appConfig = appConfig;
        this.options = options;
        this.modalService = modalService;
        this.choice = 'isUrl';
        this.goTo = '';
    }
    /**
     * @return {?}
     */
    FormManagerFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.params.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            _this.formio = new Formio(_this.appConfig.appUrl + "/form/" + params.id);
            _this.formio.loadForm().then((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                _this.projectId = form.project;
                _this.pathName = form.path;
                _this.getShareUrl();
            }));
            _this.service.reset(_this.route);
        }));
    };
    /**
     * @return {?}
     */
    FormManagerFormComponent.prototype.getShareUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var src = this.appConfig.appUrl + '/' + this.pathName;
        this.shareUrl = this.options.viewer + "/#/?src=" + encodeURIComponent(src);
        return this.shareUrl;
    };
    /**
     * @param {?} content
     * @return {?}
     */
    FormManagerFormComponent.prototype.openEmbed = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var goto = '';
        if (this.goTo) {
            goto += "if (d && d.formSubmission && d.formSubmission._id) { window.location.href = \"" + this.goTo + "\";}";
        }
        /** @type {?} */
        var embedCode = '<script type="text/javascript">';
        embedCode += '(function a(d, w, u) {';
        embedCode += 'var h = d.getElementsByTagName("head")[0];';
        embedCode += 'var s = d.createElement("script");';
        embedCode += 's.type = "text/javascript";';
        embedCode += 's.src = "' + this.options.viewer + '/assets/lib/seamless/seamless.parent.min.js";';
        embedCode += 's.onload = function b() {';
        embedCode += 'var f = d.getElementById("formio-form-' + this.formio.formId + '");';
        embedCode += 'if (!f || (typeof w.seamless === u)) {';
        embedCode += 'return setTimeout(b, 100);';
        embedCode += '}';
        embedCode += 'w.seamless(f, {fallback:false}).receive(function(d, e) {' + goto + '});';
        embedCode += '};';
        embedCode += 'h.appendChild(s);';
        embedCode += '})(document, window);';
        embedCode += '</script>';
        embedCode += '<iframe id="formio-form-' + this.formio.formId + '" ';
        embedCode += 'style="width:100%;border:none;" height="800px" src="' + this.shareUrl + '&iframe=1"></iframe>';
        this.embedCode = embedCode;
        this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
    };
    /**
     * @param {?} string
     * @return {?}
     */
    FormManagerFormComponent.prototype.choices = /**
     * @param {?} string
     * @return {?}
     */
    function (string) {
        this.choice = string;
    };
    FormManagerFormComponent.decorators = [
        { type: Component, args: [{
                    template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><i class=\"fa fa-share-alt glyphicon glyphicon-share\"></i> Share</button> <ul class=\"nav nav-tabs mb-2\"> <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><i class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></i></a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><i class=\"fa fa-pencil glyphicon glyphicon-pencil\"></i> Enter Data</a></li> <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><i class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></i> View Data</a></li> <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><i class=\"fa fa-edit glyphicon glyphicon-edit\"></i> Edit Form</a></li> <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li> </ul> <router-outlet></router-outlet> <ng-template #content> <div class=\"modal-header\"> <h4 class=\"modal-title\">Share or Embed this form</h4> <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\"> <span aria-hidden=\"true\">&times;</span> </button> </div> <div class=\"modal-body\"> <ul class=\"nav nav-tabs mr-auto mb-2\"> <li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><i class=\"fa fa-link\"></i> URL</a> </li> <li class=\"nav-item\"> <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><i class=\"fa fa-code\"></i> Embed</a> </li> </ul> <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre> <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\"> </div> <div class=\"modal-footer\"> <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button> </div> </ng-template> "
                },] },
    ];
    /** @nocollapse */
    FormManagerFormComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: ActivatedRoute },
        { type: FormioAppConfig },
        { type: FormManagerConfig },
        { type: BsModalService }
    ]; };
    return FormManagerFormComponent;
}());
export { FormManagerFormComponent };
if (false) {
    /** @type {?} */
    FormManagerFormComponent.prototype.choice;
    /** @type {?} */
    FormManagerFormComponent.prototype.embedCode;
    /** @type {?} */
    FormManagerFormComponent.prototype.formio;
    /** @type {?} */
    FormManagerFormComponent.prototype.shareUrl;
    /** @type {?} */
    FormManagerFormComponent.prototype.projectId;
    /** @type {?} */
    FormManagerFormComponent.prototype.pathName;
    /** @type {?} */
    FormManagerFormComponent.prototype.goTo;
    /** @type {?} */
    FormManagerFormComponent.prototype.modalRef;
    /** @type {?} */
    FormManagerFormComponent.prototype.service;
    /** @type {?} */
    FormManagerFormComponent.prototype.route;
    /** @type {?} */
    FormManagerFormComponent.prototype.appConfig;
    /** @type {?} */
    FormManagerFormComponent.prototype.options;
    /**
     * @type {?}
     * @private
     */
    FormManagerFormComponent.prototype.modalService;
}
