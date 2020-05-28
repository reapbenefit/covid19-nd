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
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { ZoneReviewDialogComponent } from './zone-review-dialog/zone-review-dialog.component';
import { RoleFilterComponent } from './role-filter/role-filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    ZoneReviewDialogComponent,
    RoleFilterComponent
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
    MatChipsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatIconModule,
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
