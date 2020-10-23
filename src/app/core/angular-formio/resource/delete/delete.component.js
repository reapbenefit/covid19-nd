/**
 * @fileoverview added by tsickle
 * Generated from: resource/delete/delete.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
var FormioResourceDeleteComponent = /** @class */ (function () {
    function FormioResourceDeleteComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    /**
     * @return {?}
     */
    FormioResourceDeleteComponent.prototype.onDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.remove().then((/**
         * @return {?}
         */
        function () {
            _this.router.navigate(['../../'], { relativeTo: _this.route });
        }));
    };
    /**
     * @return {?}
     */
    FormioResourceDeleteComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    };
    FormioResourceDeleteComponent.decorators = [
        { type: Component, args: [{
                    template: "<h3>Are you sure you wish to delete this record?</h3> <div class=\"btn-toolbar\"> <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button> <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button> </div> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceDeleteComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return FormioResourceDeleteComponent;
}());
export { FormioResourceDeleteComponent };
if (false) {
    /** @type {?} */
    FormioResourceDeleteComponent.prototype.service;
    /** @type {?} */
    FormioResourceDeleteComponent.prototype.route;
    /** @type {?} */
    FormioResourceDeleteComponent.prototype.router;
}
