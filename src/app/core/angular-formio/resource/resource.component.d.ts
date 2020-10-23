import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '../auth/auth.service';
import { FormioResourceService } from './resource.service';
export declare class FormioResourceComponent implements OnInit, OnDestroy {
    service: FormioResourceService;
    route: ActivatedRoute;
    auth: FormioAuthService;
    private paramsSubscription;
    perms: {
        delete: boolean;
        edit: boolean;
    };
    constructor(service: FormioResourceService, route: ActivatedRoute, auth: FormioAuthService);
    ngOnInit(): void;
    init(): void;
    ngOnDestroy(): void;
}
