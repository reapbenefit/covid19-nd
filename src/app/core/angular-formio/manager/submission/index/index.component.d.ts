import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../../form-manager.service';
export declare class SubmissionIndexComponent {
    service: FormManagerService;
    route: ActivatedRoute;
    router: Router;
    constructor(service: FormManagerService, route: ActivatedRoute, router: Router);
    onSelect(row: any): void;
}
