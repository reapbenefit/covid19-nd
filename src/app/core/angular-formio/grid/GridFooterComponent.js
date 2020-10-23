/**
 * @fileoverview added by tsickle
 * Generated from: grid/GridFooterComponent.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, Output, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
var GridFooterComponent = /** @class */ (function () {
    function GridFooterComponent() {
        this.pageChanged = new EventEmitter();
        this.createItem = new EventEmitter();
    }
    GridFooterComponent.propDecorators = {
        header: [{ type: Input }],
        body: [{ type: Input }],
        createText: [{ type: Input }],
        size: [{ type: Input }],
        actionAllowed: [{ type: Input }],
        pageChanged: [{ type: Output }],
        createItem: [{ type: Output }],
        template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
    };
    return GridFooterComponent;
}());
export { GridFooterComponent };
if (false) {
    /** @type {?} */
    GridFooterComponent.prototype.header;
    /** @type {?} */
    GridFooterComponent.prototype.body;
    /** @type {?} */
    GridFooterComponent.prototype.createText;
    /** @type {?} */
    GridFooterComponent.prototype.size;
    /** @type {?} */
    GridFooterComponent.prototype.actionAllowed;
    /** @type {?} */
    GridFooterComponent.prototype.pageChanged;
    /** @type {?} */
    GridFooterComponent.prototype.createItem;
    /** @type {?} */
    GridFooterComponent.prototype.template;
}
