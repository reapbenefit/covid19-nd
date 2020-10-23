import { EventEmitter } from '@angular/core';
import { FormioAuthService } from '../auth/auth.service';
export interface FormioResourceMap {
    [name: string]: any;
}
export declare class FormioResources {
    auth?: FormioAuthService;
    resources: FormioResourceMap;
    error: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(auth?: FormioAuthService);
}
