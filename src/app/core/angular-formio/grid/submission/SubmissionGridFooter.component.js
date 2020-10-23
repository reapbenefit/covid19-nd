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
 * Generated from: grid/submission/SubmissionGridFooter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { GridFooterComponent } from '../GridFooterComponent';
var SubmissionGridFooterComponent = /** @class */ (function (_super) {
    __extends(SubmissionGridFooterComponent, _super);
    function SubmissionGridFooterComponent() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    SubmissionGridFooterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.size) {
            this.size = 7;
        }
    };
    SubmissionGridFooterComponent.decorators = [
        { type: Component, args: [{
                    template: "<ng-template> <tfoot class=\"formio-grid-footer\"> <tr> <td *ngIf=\"header\" [colSpan]=\"header.numHeaders\"> <button *ngIf=\"actionAllowed('submissionCreate') && createText\" class=\"btn btn-primary pull-left float-left\" (click)=\"createItem.emit('form')\"><i class=\"glyphicon glyphicon-plus fa fa-plus\"></i> {{ createText }}</button> <span class=\"pull-right float-right item-counter\"><span class=\"page-num\">{{ body.firstItem }} - {{ body.lastItem }}</span> / {{ body.total }} total</span> <pagination [totalItems]=\"body.total\" [itemsPerPage]=\"body.limit\" [(ngModel)]=\"body.skip\" (pageChanged)=\"pageChanged.emit($event)\" [maxSize]=\"size\" class=\"justify-content-center pagination-sm\"></pagination> </td> </tr> </tfoot> </ng-template> ",
                    styles: ["tfoot.formio-grid-footer td { padding: 0.3rem; } tfoot.formio-grid-footer .page-num { font-size: 1.4em; } tfoot.formio-grid-footer ul.pagination { margin-top: 5px; margin-bottom: 0; } "],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SubmissionGridFooterComponent.ctorParameters = function () { return []; };
    return SubmissionGridFooterComponent;
}(GridFooterComponent));
export { SubmissionGridFooterComponent };
