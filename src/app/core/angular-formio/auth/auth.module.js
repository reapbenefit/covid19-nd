/**
 * @fileoverview added by tsickle
 * Generated from: auth/auth.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '../formio.module';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
import { FormioAuthRoutes } from './auth.routes';
import { extendRouter } from '../formio.utils';
var FormioAuth = /** @class */ (function () {
    function FormioAuth() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    FormioAuth.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    FormioAuth.forChild = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    };
    FormioAuth.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule
                    ],
                    declarations: [
                        FormioAuthComponent,
                        FormioAuthLoginComponent,
                        FormioAuthRegisterComponent
                    ]
                },] },
    ];
    return FormioAuth;
}());
export { FormioAuth };
