/**
 * @fileoverview added by tsickle
 * Generated from: manager/form-manager.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormioModule } from '../formio.module';
import { FormioGrid } from '../grid/grid.module';
import { FormManagerIndexComponent } from './index/index.component';
import { FormManagerCreateComponent } from './create/create.component';
import { FormManagerFormComponent } from './form/form.component';
import { FormManagerViewComponent } from './view/view.component';
import { FormManagerEditComponent } from './edit/edit.component';
import { FormManagerDeleteComponent } from './delete/delete.component';
import { SubmissionComponent } from './submission/submission/submission.component';
import { SubmissionEditComponent } from './submission/edit/edit.component';
import { SubmissionDeleteComponent } from './submission/delete/delete.component';
import { SubmissionViewComponent } from './submission/view/view.component';
import { SubmissionIndexComponent } from './submission/index/index.component';
import { FormManagerRoutes } from './form-manager.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { extendRouter } from '../formio.utils';
var FormManagerModule = /** @class */ (function () {
    function FormManagerModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    FormManagerModule.forChild = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    FormManagerModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    };
    FormManagerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule,
                        FormsModule,
                        FormioGrid,
                        ModalModule.forRoot(),
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormManagerIndexComponent,
                        FormManagerCreateComponent,
                        FormManagerFormComponent,
                        FormManagerViewComponent,
                        FormManagerEditComponent,
                        FormManagerDeleteComponent,
                        SubmissionComponent,
                        SubmissionEditComponent,
                        SubmissionDeleteComponent,
                        SubmissionViewComponent,
                        SubmissionIndexComponent
                    ]
                },] },
    ];
    return FormManagerModule;
}());
export { FormManagerModule };
