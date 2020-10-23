/**
 * @fileoverview added by tsickle
 * Generated from: resource/index/index.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import { each } from 'lodash';
var FormioResourceIndexComponent = /** @class */ (function () {
    function FormioResourceIndexComponent(service, route, router, config, cdr) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.cdr = cdr;
    }
    /**
     * @return {?}
     */
    FormioResourceIndexComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.gridQuery = {};
        this.service.setContext(this.route);
        this.service.formLoaded.then((/**
         * @return {?}
         */
        function () {
            if (_this.service &&
                _this.config.parents &&
                _this.config.parents.length) {
                _this.service.loadParents().then((/**
                 * @param {?} parents
                 * @return {?}
                 */
                function (parents) {
                    each(parents, (/**
                     * @param {?} parent
                     * @return {?}
                     */
                    function (parent) {
                        if (parent && parent.filter) {
                            _this.gridQuery['data.' + parent.name + '._id'] =
                                parent.resource._id;
                        }
                    }));
                    // Set the source to load the grid.
                    _this.gridSrc = _this.service.formUrl;
                    _this.createText = "New " + _this.service.form.title;
                }));
            }
            else if (_this.service.formUrl) {
                _this.gridSrc = _this.service.formUrl;
                _this.createText = "New " + _this.service.form.title;
            }
            _this.cdr.detectChanges();
        }));
    };
    /**
     * @param {?} row
     * @return {?}
     */
    FormioResourceIndexComponent.prototype.onSelect = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    /**
     * @return {?}
     */
    FormioResourceIndexComponent.prototype.onCreateItem = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['new'], { relativeTo: this.route });
    };
    FormioResourceIndexComponent.decorators = [
        { type: Component, args: [{
                    template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts> <formio-grid [src]=\"gridSrc\" [query]=\"gridQuery\" [onForm]=\"service.formLoaded\" (rowSelect)=\"onSelect($event)\" (error)=\"service.onError($event)\" (createItem)=\"onCreateItem()\" [createText]=\"createText\" ></formio-grid> "
                },] },
    ];
    /** @nocollapse */
    FormioResourceIndexComponent.ctorParameters = function () { return [
        { type: FormioResourceService },
        { type: ActivatedRoute },
        { type: Router },
        { type: FormioResourceConfig },
        { type: ChangeDetectorRef }
    ]; };
    return FormioResourceIndexComponent;
}());
export { FormioResourceIndexComponent };
if (false) {
    /** @type {?} */
    FormioResourceIndexComponent.prototype.gridSrc;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.gridQuery;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.createText;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.service;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.route;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.router;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.config;
    /** @type {?} */
    FormioResourceIndexComponent.prototype.cdr;
}
