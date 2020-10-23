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
 * Generated from: grid/submission/SubmissionGridBody.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { get } from 'lodash';
import { GridBodyComponent } from '../GridBodyComponent';
import { Utils } from '../../../formiojs';
var formatDate = Utils.formatDate;
var SubmissionGridBodyComponent = /** @class */ (function (_super) {
    __extends(SubmissionGridBodyComponent, _super);
    function SubmissionGridBodyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    SubmissionGridBodyComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    function (formio, query) {
        var _this = this;
        query = query || {};
        return formio.loadSubmissions({ params: query })
            .then((/**
         * @param {?} submissions
         * @return {?}
         */
        function (submissions) { return _this.setRows(query, submissions); }));
    };
    /**
     * Render the cell data.
     *
     * @param row
     * @param header
     * @return any
     */
    /**
     * Render the cell data.
     *
     * @param {?} row
     * @param {?} header
     * @return {?} any
     */
    SubmissionGridBodyComponent.prototype.view = /**
     * Render the cell data.
     *
     * @param {?} row
     * @param {?} header
     * @return {?} any
     */
    function (row, header) {
        /** @type {?} */
        var cellValue = get(row, header.key);
        if (header.getView) {
            return header.getView(cellValue);
        }
        else {
            if (header.component) {
                if (typeof header.component.getView === 'function') {
                    return header.component.getView(cellValue);
                }
                return header.component.asString(cellValue);
            }
            else {
                return header.format ? formatDate(cellValue, header.format, '') : cellValue.toString();
            }
        }
    };
    SubmissionGridBodyComponent.decorators = [
        { type: Component, args: [{
                    template: "<ng-template> <tbody> <tr *ngFor=\"let row of rows\" (click)=\"onRowSelect($event, row)\"> <td *ngFor=\"let rowHeader of header.headers\" [innerHTML]=\"view(row, rowHeader)\"></td> </tr> </tbody> </ng-template> "
                },] },
    ];
    return SubmissionGridBodyComponent;
}(GridBodyComponent));
export { SubmissionGridBodyComponent };
