import { ExtendedComponentSchema, BuilderInfo, ValidateOptions } from '../formiojs';
import { EventEmitter } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
export interface FormioCustomComponentInfo extends BuilderInfo {
    type: string;
    selector: string;
    emptyValue?: any;
    extraValidators?: (keyof ValidateOptions)[];
    fieldOptions?: string[];
    template?: string;
    changeEvent?: string;
    editForm?: () => {
        components: ExtendedComponentSchema[];
    };
}
export declare type FormioCustomElement = NgElement & WithProperties<{
    value: any;
} & ExtendedComponentSchema>;
export interface FormioEvent {
    eventName: string;
    data?: {
        [key: string]: any;
    };
}
export interface FormioCustomComponent<T> {
    value: T;
    valueChange: EventEmitter<T>;
    disabled: boolean;
    formioEvent?: EventEmitter<FormioEvent>;
}
