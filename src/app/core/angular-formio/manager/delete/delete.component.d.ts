import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '../../components/alerts/formio.alerts';
export declare class FormManagerDeleteComponent {
    service: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    alerts: FormioAlerts;
    constructor(service: FormManagerService, router: Router, route: ActivatedRoute, alerts: FormioAlerts);
    onDelete(): void;
    onCancel(): void;
}
