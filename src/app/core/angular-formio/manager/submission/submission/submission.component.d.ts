import { OnInit } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute } from '@angular/router';
export declare class SubmissionComponent implements OnInit {
    service: FormManagerService;
    route: ActivatedRoute;
    downloadUrl: string;
    constructor(service: FormManagerService, route: ActivatedRoute);
    setDownloadUrl(url: any): void;
    ngOnInit(): void;
}
