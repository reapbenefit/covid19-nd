/**
 * @fileoverview added by tsickle
 * Generated from: manager/index/index.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { FormioGridComponent } from '../../grid/grid.component';
var FormManagerIndexComponent = /** @class */ (function () {
    function FormManagerIndexComponent(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.search = '';
        this.gridQuery = { tags: this.config.tag, type: 'form' };
        this.refreshGrid = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FormManagerIndexComponent.prototype.loadGrid = /**
     * @return {?}
     */
    function () {
        this.search = localStorage.getItem('searchInput');
        this.gridQuery = JSON.parse(localStorage.getItem('query')) || this.gridQuery;
        /** @type {?} */
        var currentPage = +localStorage.getItem('currentPage') || 1;
        this.formGrid.refreshGrid(this.gridQuery);
        this.formGrid.setPage(currentPage);
    };
    /**
     * @return {?}
     */
    FormManagerIndexComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.gridQuery = { tags: this.config.tag, type: 'form' };
        this.service.reset();
        this.service.ready.then((/**
         * @return {?}
         */
        function () {
            _this.loadGrid();
            _this.formGrid.footer.pageChanged.subscribe((/**
             * @param {?} page
             * @return {?}
             */
            function (page) {
                localStorage.setItem('currentPage', page.page);
            }));
        }));
    };
    /**
     * @return {?}
     */
    FormManagerIndexComponent.prototype.onSearch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var searchInput = this.search;
        if (searchInput.length > 0) {
            this.gridQuery.skip = 0;
            this.gridQuery.title__regex = '/' + searchInput + '/i';
        }
        else {
            delete this.gridQuery.title__regex;
        }
        localStorage.setItem('query', JSON.stringify(this.gridQuery));
        localStorage.setItem('searchInput', this.search);
        this.formGrid.pageChanged({ page: 1, itemPerPage: this.gridQuery.limit });
        this.refreshGrid.emit(this.gridQuery);
    };
    /**
     * @return {?}
     */
    FormManagerIndexComponent.prototype.clearSearch = /**
     * @return {?}
     */
    function () {
        this.gridQuery = { tags: this.config.tag, type: 'form' };
        localStorage.removeItem('query');
        localStorage.removeItem('searchInput');
        localStorage.removeItem('currentPage');
        this.search = '';
        this.formGrid.pageChanged({ page: 1 });
        this.formGrid.query = {};
        this.formGrid.refreshGrid({ tags: this.config.tag, type: 'form' });
    };
    /**
     * @param {?} action
     * @return {?}
     */
    FormManagerIndexComponent.prototype.onAction = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
    };
    /**
     * @param {?} row
     * @return {?}
     */
    FormManagerIndexComponent.prototype.onSelect = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    };
    /**
     * @return {?}
     */
    FormManagerIndexComponent.prototype.onCreateItem = /**
     * @return {?}
     */
    function () {
        this.router.navigate(['create'], { relativeTo: this.route });
    };
    FormManagerIndexComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"input-group mb-3\" *ngIf=\"config.includeSearch\"> <input type=\"text\" class=\"form-control\" [(ngModel)]=\"search\" (keydown.enter)=\"onSearch()\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\"> <span  *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></span> <div class=\"input-group-append\"> <button class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-search\" (click)=\"onSearch()\"><i class=\"fa fa-search\"></i> Search</button> </div> </div> <formio-grid *ngIf=\"service.ready\" [formio]=\"service.formio\" [gridType]=\"'form'\" [query]=\"gridQuery\" [refresh]=\"refreshGrid\" [isActionAllowed]=\"service.actionAllowed\" (rowAction)=\"onAction($event)\" (rowSelect)=\"onSelect($event)\" (createItem)=\"onCreateItem()\" ></formio-grid> ",
                    styles: [".form-clear { align-items: center; background: #cecece; border-radius: 50%; bottom: 8px; color: rgba(0, 0, 0, 0.3); cursor: pointer; display: flex; justify-content: center; height: 24px; position: absolute; right: 90px; top: 6px; width: 24px; z-index: 10; } .form-clear .fa { font-size: 16px; font-weight: 500; } "]
                },] },
    ];
    /** @nocollapse */
    FormManagerIndexComponent.ctorParameters = function () { return [
        { type: FormManagerService },
        { type: ActivatedRoute },
        { type: Router },
        { type: FormManagerConfig }
    ]; };
    FormManagerIndexComponent.propDecorators = {
        formGrid: [{ type: ViewChild, args: [FormioGridComponent, { static: false },] }]
    };
    return FormManagerIndexComponent;
}());
export { FormManagerIndexComponent };
if (false) {
    /** @type {?} */
    FormManagerIndexComponent.prototype.formGrid;
    /** @type {?} */
    FormManagerIndexComponent.prototype.gridQuery;
    /** @type {?} */
    FormManagerIndexComponent.prototype.refreshGrid;
    /** @type {?} */
    FormManagerIndexComponent.prototype.search;
    /** @type {?} */
    FormManagerIndexComponent.prototype.service;
    /** @type {?} */
    FormManagerIndexComponent.prototype.route;
    /** @type {?} */
    FormManagerIndexComponent.prototype.router;
    /** @type {?} */
    FormManagerIndexComponent.prototype.config;
}
