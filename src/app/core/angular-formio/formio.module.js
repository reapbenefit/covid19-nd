/**
 * @fileoverview added by tsickle
 * Generated from: formio.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioComponent } from './components/formio/formio.component';
import { FormBuilderComponent } from './components/formbuilder/formbuilder.component';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { FormioAlertsComponent } from './components/alerts/formio.alerts.component';
import { FormioLoader } from './components/loader/formio.loader';
import { FormioLoaderComponent } from './components/loader/formio.loader.component';
import { CustomTagsService } from './custom-component/custom-tags.service';
var FormioModule = /** @class */ (function () {
    function FormioModule() {
    }
    FormioModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        FormioComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FormioComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent
                    ],
                    providers: [
                        FormioLoader,
                        FormioAlerts,
                        CustomTagsService
                    ],
                    entryComponents: [
                        FormioComponent,
                        FormBuilderComponent
                    ]
                },] },
    ];
    return FormioModule;
}());
export { FormioModule };
