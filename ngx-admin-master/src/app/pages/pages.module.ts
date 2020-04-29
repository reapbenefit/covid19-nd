import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PublicFormComponent } from './public-form/public-form.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ReactiveFormsModule
  ],
  declarations: [
    PagesComponent,
    PublicFormComponent,
    TableComponent
  ],
})
export class PagesModule {
}
