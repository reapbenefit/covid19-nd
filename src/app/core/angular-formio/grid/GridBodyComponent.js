/**
 * @fileoverview added by tsickle
 * Generated from: grid/GridBodyComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { each, clone } from 'lodash';
import { GridHeaderComponent } from './GridHeaderComponent';
var GridBodyComponent = /** @class */ (function () {
    function GridBodyComponent() {
        this.firstItem = 0;
        this.lastItem = 0;
        this.skip = 0;
        this.limit = 0;
        this.total = 0;
        this.rowSelect = new EventEmitter();
        this.rowAction = new EventEmitter();
        this.loading = true;
    }
    /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    GridBodyComponent.prototype.load = /**
     * @param {?} formio
     * @param {?=} query
     * @return {?}
     */
    function (formio, query) {
        return Promise.resolve({});
    };
    /**
     * @param {?} event
     * @param {?} row
     * @return {?}
     */
    GridBodyComponent.prototype.onRowSelect = /**
     * @param {?} event
     * @param {?} row
     * @return {?}
     */
    function (event, row) {
        event.preventDefault();
        this.rowSelect.emit(row);
    };
    /**
     * @param {?} event
     * @param {?} row
     * @param {?} action
     * @return {?}
     */
    GridBodyComponent.prototype.onRowAction = /**
     * @param {?} event
     * @param {?} row
     * @param {?} action
     * @return {?}
     */
    function (event, row, action) {
        event.preventDefault();
        this.rowAction.emit({ row: row, action: action });
    };
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    /**
     * Set the rows for this Grid body.
     *
     * @param {?} query
     * @param {?} items
     * @return {?} any
     */
    GridBodyComponent.prototype.setRows = /**
     * Set the rows for this Grid body.
     *
     * @param {?} query
     * @param {?} items
     * @return {?} any
     */
    function (query, items) {
        var _this = this;
        this.rows = [];
        this.firstItem = query.skip + 1;
        this.lastItem = this.firstItem + items.length - 1;
        this.total = items.serverCount;
        this.limit = query.limit;
        this.skip = Math.floor(items.skip / query.limit) + 1;
        this.loading = false;
        each(items, (/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.rows.push(clone(item));
        }));
        return this.rows;
    };
    GridBodyComponent.propDecorators = {
        header: [{ type: Input }],
        actionAllowed: [{ type: Input }],
        rowSelect: [{ type: Output }],
        rowAction: [{ type: Output }],
        template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
    };
    return GridBodyComponent;
}());
export { GridBodyComponent };
if (false) {
    /** @type {?} */
    GridBodyComponent.prototype.header;
    /** @type {?} */
    GridBodyComponent.prototype.actionAllowed;
    /** @type {?} */
    GridBodyComponent.prototype.rowSelect;
    /** @type {?} */
    GridBodyComponent.prototype.rowAction;
    /** @type {?} */
    GridBodyComponent.prototype.template;
    /** @type {?} */
    GridBodyComponent.prototype.rows;
    /** @type {?} */
    GridBodyComponent.prototype.loading;
    /** @type {?} */
    GridBodyComponent.prototype.firstItem;
    /** @type {?} */
    GridBodyComponent.prototype.lastItem;
    /** @type {?} */
    GridBodyComponent.prototype.skip;
    /** @type {?} */
    GridBodyComponent.prototype.limit;
    /** @type {?} */
    GridBodyComponent.prototype.total;
}
