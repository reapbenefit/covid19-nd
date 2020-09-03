import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainContentComponent } from "./main-content/main-content.component";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { MapsComponentComponent } from "./maps-component/maps-component.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GraphsComponent } from "./graphs/graphs.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { CommonService } from "./services/common.service";
import { TreeviewModule } from "ngx-treeview";
import { GoogleAnalyticsService } from "./services/google-analytics.service";
import { environment } from "./../environments/environment.prod";
import { DeviceDetectorModule } from "ngx-device-detector";
import { from } from "rxjs";
import { FilterPipe, InputsearchPipe, RaTotalCounts } from "./app.component";
import { DatePipe } from "@angular/common";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

import { ParseUrl } from "./parse-url.pipe";
import { DynamicContent } from "./dynamic-content.directive";

import { NgxMapboxGLModule } from "ngx-mapbox-gl";

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MapsComponentComponent,
    GraphsComponent,
    FilterPipe,
    InputsearchPipe,
    RaTotalCounts,
    ParseUrl,
    DynamicContent,
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
    TreeviewModule.forRoot(),
    AgmCoreModule.forRoot({
      clientId: "<mandatory>",
      language: "en",
      libraries: ["geometry", "places"],
      apiKey: environment.maps_api_key,
    }),
    DeviceDetectorModule.forRoot(),
    KeycloakAngularModule,
    NgxMapboxGLModule.withConfig({
      accessToken:
        "pk.eyJ1IjoicmFtZXNoY3NlaXQiLCJhIjoiY2tlanIybGY2MHgwcTJ0bzZjYm02enllbiJ9.9zZSOVLBiD4Ya9wIaDEzsA",
    }),
  ],
  providers: [CommonService, DatePipe, GoogleAnalyticsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
