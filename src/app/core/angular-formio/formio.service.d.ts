import { Observable } from 'rxjs';
import { FormioForm } from './formio.common';
export declare class FormioService {
    url: string;
    options?: object;
    formio: any;
    constructor(url: string, options?: object);
    requestWrapper(fn: any): any;
    saveForm(form: FormioForm, options?: any): Observable<FormioForm>;
    loadForm(query?: any, options?: any): Observable<FormioForm>;
    loadForms(query: any, options?: any): Observable<FormioForm>;
    loadSubmission(query?: any, options?: any): Observable<{}>;
    userPermissions(user: any, form: any, submission: any): Observable<{}>;
    deleteSubmission(data?: any, options?: any): Observable<{}>;
    saveSubmission(submission: {}, options?: any): Observable<{}>;
    loadSubmissions(query?: any, options?: any): Observable<{}>;
}
