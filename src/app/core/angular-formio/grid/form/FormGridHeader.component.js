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
 * Generated from: grid/form/FormGridHeader.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { GridHeaderComponent } from '../GridHeaderComponent';
var FormGridHeaderComponent = /** @class */ (function (_super) {
    __extends(FormGridHeaderComponent, _super);
    function FormGridHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?=} formio
     * @return {?}
     */
    FormGridHeaderComponent.prototype.load = /**
     * @param {?=} formio
     * @return {?}
     */
    function (formio) {
        this.header = {
            label: 'Title',
            key: 'title',
            sort: 'asc'
        };
        this.headers = [this.header];
        return Promise.resolve(this.headers);
    };
    Object.defineProperty(FormGridHeaderComponent.prototype, "numHeaders", {
        get: /**
         * @return {?}
         */
        function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    FormGridHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'form-grid-header',
                    template: "<ng-template> <thead> <tr> <th> <div class=\"row\"> <div class=\"col-sm-8\"> <a (click)=\"sort.emit(header)\"> {{ header.label }}&nbsp;<span [ngClass]=\"{'glyphicon-triangle-top fa-caret-up': (header.sort === 'asc'), 'glyphicon-triangle-bottom fa-caret-down': (header.sort === 'desc')}\" class=\"glyphicon fa\" *ngIf=\"header.sort\"></span> </a> </div> <div class=\"col-sm-4\"> Operations </div> </div> </th> </tr> </thead> </ng-template> "
                },] },
    ];
    return FormGridHeaderComponent;
}(GridHeaderComponent));
export { FormGridHeaderComponent };
if (false) {
    /** @type {?} */
    FormGridHeaderComponent.prototype.header;
}
