export interface FormManagerRouteConfig {
    formIndex?: any;
    formCreate?: any;
    form?: any;
    formView?: any;
    formEdit?: any;
    formEmbed?: any;
    formDelete?: any;
    submissionIndex?: any;
    submission?: any;
    submissionView?: any;
    submissionEdit?: any;
    submissionDelete?: any;
}
export declare class FormManagerConfig {
    tag: string;
    includeSearch: boolean;
    saveDraft: boolean;
    builder?: any;
    viewer?: string;
    renderer: any;
}
