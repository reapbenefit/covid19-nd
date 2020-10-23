import { OnInit, TemplateRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { ActivatedRoute } from '@angular/router';
import { FormioAppConfig } from '../../formio.config';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
export declare class FormManagerFormComponent implements OnInit {
    service: FormManagerService;
    route: ActivatedRoute;
    appConfig: FormioAppConfig;
    options: FormManagerConfig;
    private modalService;
    choice: any;
    embedCode: any;
    formio: any;
    shareUrl: any;
    projectId: any;
    pathName: any;
    goTo: any;
    modalRef: BsModalRef;
    constructor(service: FormManagerService, route: ActivatedRoute, appConfig: FormioAppConfig, options: FormManagerConfig, modalService: BsModalService);
    ngOnInit(): void;
    getShareUrl(): any;
    openEmbed(content: TemplateRef<any>): void;
    choices(string: any): void;
}
