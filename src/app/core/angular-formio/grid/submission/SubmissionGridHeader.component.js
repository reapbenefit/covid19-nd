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
 * Generated from: grid/submission/SubmissionGridHeader.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Utils, Components } from '../../../formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';
var SubmissionGridHeaderComponent = /** @class */ (function (_super) {
    __extends(SubmissionGridHeaderComponent, _super);
    function SubmissionGridHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} formio
     * @param {?=} query
     * @param {?=} columns
     * @return {?}
     */
    SubmissionGridHeaderComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @param {?=} columns
     * @return {?}
     */
    function (formio, query, columns) {
        var _this = this;
        query = query || {};
        return formio.loadForm({ params: query }).then((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            _this.headers = [];
            _this.formComponents = new Map();
            _this.setComponents(form.components);
            columns ? columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                if (_this.formComponents.has(column.path)) {
                    _this.setHeader(column, _this.formComponents.get(column.path));
                }
                else {
                    _this.setHeader(column);
                }
            })) : _this.setComponentsHeaders(_this.formComponents);
            return _this.headers;
        }));
    };
    // Set header for both component and column
    // Set header for both component and column
    /**
     * @param {?=} column
     * @param {?=} component
     * @param {?=} sort
     * @return {?}
     */
    SubmissionGridHeaderComponent.prototype.setHeader = 
    // Set header for both component and column
    /**
     * @param {?=} column
     * @param {?=} component
     * @param {?=} sort
     * @return {?}
     */
    function (column, component, sort) {
        /** @type {?} */
        var key = column ? column.path : "data." + component.key;
        /** @type {?} */
        var label = column ? column.label : component.label;
        this.headers.push({
            label: label,
            key: key,
            sort: sort || '',
            component: component ? Components.create(component, null, null, true) : null,
            format: column && column.format ? column.format : null
        });
    };
    // Set headers from components in case if columns are not provided
    // Set headers from components in case if columns are not provided
    /**
     * @param {?} components
     * @param {?=} sort
     * @return {?}
     */
    SubmissionGridHeaderComponent.prototype.setComponentsHeaders = 
    // Set headers from components in case if columns are not provided
    /**
     * @param {?} components
     * @param {?=} sort
     * @return {?}
     */
    function (components, sort) {
        var _this = this;
        components.forEach((/**
         * @param {?} component
         * @return {?}
         */
        function (component) {
            if (component.input &&
                (!component.hasOwnProperty('tableView') || component.tableView)) {
                _this.setHeader(null, component, sort);
            }
        }));
    };
    // Map components
    // Map components
    /**
     * @param {?} components
     * @return {?}
     */
    SubmissionGridHeaderComponent.prototype.setComponents = 
    // Map components
    /**
     * @param {?} components
     * @return {?}
     */
    function (components) {
        var _this = this;
        Utils.eachComponent(components, (/**
         * @param {?} component
         * @param {?} newPath
         * @return {?}
         */
        function (component, newPath) {
            _this.formComponents.set("data." + newPath, component);
        }));
    };
    SubmissionGridHeaderComponent.decorators = [
        { type: Component, args: [{
                    template: "<ng-template> <thead> <tr> <th *ngFor=\"let header of headers\"> <a (click)=\"sort.emit(header)\"> {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top': (header.sort === 'asc'), 'glyphicon-triangle-bottom': (header.sort === 'desc')}\" class=\"glyphicon\" *ngIf=\"header.sort\"></span> </a> </th> </tr> </thead> </ng-template> "
                },] },
    ];
    return SubmissionGridHeaderComponent;
}(GridHeaderComponent));
export { SubmissionGridHeaderComponent };
if (false) {
    /** @type {?} */
    SubmissionGridHeaderComponent.prototype.formComponents;
}
