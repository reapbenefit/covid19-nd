import { FormioAppConfig } from '../formio.config';
import { FormManagerConfig } from './form-manager.config';
import { Formio } from '../../formiojs';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
export declare class FormManagerService {
    appConfig: FormioAppConfig;
    config: FormManagerConfig;
    auth: FormioAuthService;
    formio: Formio;
    access: any;
    allAccessMap: any;
    ownAccessMap: any;
    ready: Promise<any>;
    actionAllowed: any;
    form: any;
    perms: {
        delete: boolean;
        edit: boolean;
    };
    constructor(appConfig: FormioAppConfig, config: FormManagerConfig, auth: FormioAuthService);
    isActionAllowed(action: string): any;
    setAccess(): void;
    reset(route?: ActivatedRoute): void;
    hasAccess(roles: any): boolean;
    setForm(form: any): any;
    loadForm(): any;
    setSubmission(route: ActivatedRoute): Promise<unknown>;
    submissionLoaded(submission: any): void;
    loadForms(): any;
    createForm(form: any): Promise<any>;
}
