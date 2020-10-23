import { EventEmitter } from '@angular/core';
import { ExtendedComponentSchema } from '../../../formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';
import { FormioPromiseService } from '../../formio-promise.service';
export declare class SubmissionGridHeaderComponent extends GridHeaderComponent {
    formComponents: Map<string, ExtendedComponentSchema>;
    load(formio: FormioPromiseService, query?: any, columns?: Array<any>): Promise<any[]>;
    setHeader(column?: any, component?: ExtendedComponentSchema, sort?: EventEmitter<any>): void;
    setComponentsHeaders(components: Map<string, ExtendedComponentSchema>, sort?: EventEmitter<any>): void;
    setComponents(components: any): void;
}
