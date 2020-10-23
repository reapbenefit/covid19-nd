import { GridBodyComponent } from '../GridBodyComponent';
import { FormioPromiseService } from '../../formio-promise.service';
export declare class SubmissionGridBodyComponent extends GridBodyComponent {
    load(formio: FormioPromiseService, query?: any): Promise<any[]>;
    /**
     * Render the cell data.
     *
     * @param row
     * @param header
     * @return any
     */
    view(row: any, header: any): any;
}
