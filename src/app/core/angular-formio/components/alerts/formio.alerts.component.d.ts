import { EventEmitter, OnInit } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
export declare class FormioAlertsComponent implements OnInit {
    alerts: FormioAlerts;
    focusComponent: EventEmitter<object>;
    ngOnInit(): void;
    getComponent(event: any, alert: any): void;
}
