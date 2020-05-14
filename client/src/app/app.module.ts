import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MapsComponentComponent } from './maps-component/maps-component.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GraphsComponent } from './graphs/graphs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CommonService } from './services/common.service';
import { TreeviewModule } from 'ngx-treeview';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { environment } from './../environments/environment.prod'
import { DeviceDetectorModule } from 'ngx-device-detector';
import { from } from 'rxjs';
import { FilterPipe, InputsearchPipe, RaTotalCounts } from './app.component';
import { DatePipe } from '@angular/common';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ZoneCreatorComponent } from './zone-creator/zone-creator.component';
import { ZoneDetailsDialogComponent } from './zone-details-dialog/zone-details-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ZoneReviewDialogComponent } from './zone-review-dialog/zone-review-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MapsComponentComponent,
    GraphsComponent,
    FilterPipe,
    InputsearchPipe,
    RaTotalCounts,
    ZoneCreatorComponent,
    ZoneDetailsDialogComponent,
    ZoneReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SelectDropDownModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    TreeviewModule.forRoot(),
    AgmCoreModule.forRoot({
      clientId: '<mandatory>',
      language: 'en',
      libraries: ['geometry', 'places', 'drawing'],
      apiKey: environment.maps_api_key
    }),
    DeviceDetectorModule.forRoot(),
    KeycloakAngularModule,
  ],
  providers: [
    CommonService, 
    DatePipe,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ZoneDetailsDialogComponent, ZoneReviewDialogComponent]
})
export class AppModule { }
