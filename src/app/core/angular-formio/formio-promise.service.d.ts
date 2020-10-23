import { FormioForm } from './index';
export declare class FormioPromiseService {
    url: string;
    options?: object;
    private formioService;
    constructor(url: string, options?: object);
    saveForm(form: FormioForm, options?: any): Promise<any>;
    loadForm(query?: any, options?: any): Promise<any>;
    loadSubmission(query?: any, options?: any): Promise<any>;
    userPermissions(user: any, form: any, submission: any): Promise<any>;
    deleteSubmission(data?: any, options?: any): Promise<any>;
    loadForms(query: any, options?: any): Promise<any>;
    saveSubmission(submission: {}, options?: any): Promise<any>;
    loadSubmissions(query?: any, options?: any): Promise<any>;
}
