import { EventEmitter, TemplateRef } from '@angular/core';
import { FormioPromiseService } from '../formio-promise.service';
export declare class GridHeaderComponent {
    actionAllowed: any;
    sort: EventEmitter<any>;
    template: TemplateRef<any>;
    headers: Array<any>;
    constructor();
    get numHeaders(): number;
    load(formio: FormioPromiseService, query?: any, columns?: Array<any>): Promise<any>;
}
