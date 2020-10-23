import { GridHeaderComponent } from '../GridHeaderComponent';
export declare class FormGridHeaderComponent extends GridHeaderComponent {
    header: any;
    load(formio?: any): Promise<any[]>;
    get numHeaders(): number;
}
