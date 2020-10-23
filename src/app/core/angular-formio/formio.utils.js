/**
 * @fileoverview added by tsickle
 * Generated from: formio.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { RouterModule } from '@angular/router';
import { each } from 'lodash';
/**
 * @param {?} Class
 * @param {?} config
 * @param {?} ClassRoutes
 * @return {?}
 */
export function extendRouter(Class, config, ClassRoutes) {
    each(Class.decorators, (/**
     * @param {?} decorator
     * @return {?}
     */
    function (decorator) {
        each(decorator.args, (/**
         * @param {?} arg
         * @return {?}
         */
        function (arg) {
            if (arg.declarations) {
                each(config, (/**
                 * @param {?} component
                 * @return {?}
                 */
                function (component) { return arg.declarations.push(component); }));
            }
            if (arg.imports) {
                each(arg.imports, (/**
                 * @param {?} _import
                 * @param {?} index
                 * @return {?}
                 */
                function (_import, index) {
                    if ((_import.ngModule && (_import.ngModule.name === 'RouterModule')) ||
                        (_import.name === 'RouterModule')) {
                        arg.imports[index] = RouterModule.forChild(ClassRoutes(config));
                    }
                }));
            }
        }));
    }));
    return Class;
}
