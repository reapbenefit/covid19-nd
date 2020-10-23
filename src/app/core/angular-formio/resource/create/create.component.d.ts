import { EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
export declare class FormioResourceCreateComponent implements OnInit {
    service: FormioResourceService;
    route: ActivatedRoute;
    router: Router;
    config: FormioResourceConfig;
    onError: EventEmitter<any>;
    onSuccess: EventEmitter<any>;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    ngOnInit(): void;
    onSubmit(submission: any): void;
}
