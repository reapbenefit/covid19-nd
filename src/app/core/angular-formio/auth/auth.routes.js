/**
 * @fileoverview added by tsickle
 * Generated from: auth/auth.routes.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
/**
 * @param {?=} config
 * @return {?}
 */
export function FormioAuthRoutes(config) {
    return [
        {
            path: '',
            component: config && config.auth ? config.auth : FormioAuthComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: config && config.login ? config.login : FormioAuthLoginComponent
                },
                {
                    path: 'register',
                    component: config && config.register ? config.register : FormioAuthRegisterComponent
                }
            ]
        }
    ];
}
