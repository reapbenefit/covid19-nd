import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
export declare class FormioResourceDeleteComponent {
    service: FormioResourceService;
    route: ActivatedRoute;
    router: Router;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router);
    onDelete(): void;
    onCancel(): void;
}
