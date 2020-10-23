import { Injector, Type } from '@angular/core';
import { FormioCustomComponentInfo } from '../elements.common';
export declare function registerCustomTag(tag: string, injector: Injector): void;
export declare function registerCustomTags(tags: string[], injector: Injector): void;
export declare function registerCustomFormioComponent(options: FormioCustomComponentInfo, angularComponent: Type<any>, injector: Injector): void;
export declare function registerCustomFormioComponentWithClass(options: FormioCustomComponentInfo, angularComponent: Type<any>, formioClass: any, injector: Injector): void;
