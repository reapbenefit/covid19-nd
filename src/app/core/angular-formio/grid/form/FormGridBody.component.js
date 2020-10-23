var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * Generated from: grid/form/FormGridBody.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { GridBodyComponent } from '../GridBodyComponent';
var FormGridBodyComponent = /** @class */ (function (_super) {
    __extends(FormGridBodyComponent, _super);
    function FormGridBodyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    FormGridBodyComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    function (formio, query) {
        var _this = this;
        query = query || {};
        return formio.loadForms({ params: query }).then((/**
         * @param {?} forms
         * @return {?}
         */
        function (forms) { return _this.setRows(query, forms); }));
    };
    FormGridBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-grid-body',
                    styles: [".form-btn { font-size: 0.75rem; } "],
                    template: "<ng-template> <tbody *ngIf=\"rows\"> <tr *ngFor=\"let form of rows\"> <td> <div class=\"row\"> <div class=\"col-sm-8\"> <a routerLink=\"{{form._id}}/view\" (click)=\"onRowSelect($event, form)\"><h5>{{ form.title }}</h5></a> </div> <div class=\"col-sm-4\"> <button *ngIf=\"actionAllowed('formView')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'view')\"><span class=\"fa fa-pencil\"></span> Enter Data</button>&nbsp; <button *ngIf=\"actionAllowed('submissionIndex')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'submission')\"><span class=\"fa fa-list-alt\"></span> View Data</button>&nbsp; <button *ngIf=\"actionAllowed('formEdit')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'edit')\"><span class=\"fa fa-edit\"></span> Edit Form</button>&nbsp; <button *ngIf=\"actionAllowed('formDelete')\" class=\"btn btn-secondary btn-sm form-btn\" (click)=\"onRowAction($event, form, 'delete')\"><span class=\"fa fa-trash\"></span></button> </div> </div> </td> </tr> </tbody> </ng-template> "
                },] },
    ];
    return FormGridBodyComponent;
}(GridBodyComponent));
export { FormGridBodyComponent };
