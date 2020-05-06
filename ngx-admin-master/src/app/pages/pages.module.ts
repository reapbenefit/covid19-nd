import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PublicFormComponent } from './public-form/public-form.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsr7zA9xdgcj4GFj69--1--CvBVlVX_Xs',
      libraries: ['places']
    })
  ],
  declarations: [
    PagesComponent,
    PublicFormComponent,
    LocationPickerComponent
  ],
})
export class PagesModule {
}

