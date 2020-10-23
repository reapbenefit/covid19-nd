import { OnInit, NgZone, OnChanges } from '@angular/core';
import { FormioLoader } from '../loader/formio.loader';
import { FormioAppConfig } from '../../formio.config';
import { FormioBaseComponent } from '../../FormioBaseComponent';
import { CustomTagsService } from '../../custom-component/custom-tags.service';
export declare class FormioComponent extends FormioBaseComponent implements OnInit, OnChanges {
    ngZone: NgZone;
    loader: FormioLoader;
    config: FormioAppConfig;
    customTags?: CustomTagsService;
    constructor(ngZone: NgZone, loader: FormioLoader, config: FormioAppConfig, customTags?: CustomTagsService);
    getRenderer(): any;
}
