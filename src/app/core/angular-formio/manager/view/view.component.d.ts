import { OnInit, EventEmitter } from '@angular/core';
import { FormManagerConfig } from '../form-manager.config';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAuthService } from '../../auth/auth.service';
export declare class FormManagerViewComponent implements OnInit {
    service: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    config: FormManagerConfig;
    auth: FormioAuthService;
    submission: any;
    currentForm: any;
    renderOptions: any;
    onSuccess: EventEmitter<object>;
    onError: EventEmitter<object>;
    constructor(service: FormManagerService, router: Router, route: ActivatedRoute, config: FormManagerConfig, auth: FormioAuthService);
    ngOnInit(): void;
    onSubmit(submission: any): void;
}
