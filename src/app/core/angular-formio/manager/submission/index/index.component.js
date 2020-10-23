/**
 * @fileoverview added by tsickle
 * Generated from: manager/submission/index/index.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../../form-manager.service';
var SubmissionIndexComponent = /** @class */ (function () {
    function SubmissionIndexComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    /**
     * @param {?} row
     * @return {?}
     */
    SubmissionIndexComponent.prototype.onSelect = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    SubmissionIndexComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid> "
                },] },
    ];
    /** @nocollapse */
    SubmissionIndexComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return SubmissionIndexComponent;
}());
export { SubmissionIndexComponent };
if (false) {
    /** @type {?} */
    SubmissionIndexComponent.prototype.service;
    /** @type {?} */
    SubmissionIndexComponent.prototype.route;
    /** @type {?} */
    SubmissionIndexComponent.prototype.router;
}
