import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
export declare class SubmissionEditComponent {
    service: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    constructor(service: FormManagerService, router: Router, route: ActivatedRoute);
    onSubmit(submission: any): void;
}
