import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {AdminService} from './service/admin.service';
import { AgmCoreModule } from '@agm/core';
import { AgGridModule } from 'ag-grid-angular';


import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { LoginkeycloakComponent } from './loginkeycloak/loginkeycloak.component';
import { TableComponent } from './pages/table/table.component';
//import { EditButtonComponent } from './edit-button/edit-button.component';

@NgModule({
  declarations: [AppComponent, LoginkeycloakComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsr7zA9xdgcj4GFj69--1--CvBVlVX_Xs',
      libraries: ['places']
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers :[AdminService],
  bootstrap: [AppComponent],
})
export class AppModule {
}