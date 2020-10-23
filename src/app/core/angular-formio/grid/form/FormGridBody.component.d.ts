import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '../../formio-promise.service';
export declare class FormGridBodyComponent extends GridBodyComponent {
    load(formio: FormioPromiseService, query?: any): Promise<any[]>;
}
