import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
export declare class FormioResourceEditComponent {
    service: FormioResourceService;
    route: ActivatedRoute;
    router: Router;
    config: FormioResourceConfig;
    triggerError: EventEmitter<any>;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    onSubmit(submission: any): void;
}
