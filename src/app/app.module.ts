import { NotificationComponent } from "./components/notification/notification.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, DoBootstrap, ApplicationRef, APP_INITIALIZER, } from "@angular/core";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
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
import { MobileMapContentComponent } from "./mobile-map-content/mobile-map-content.component";
import { SignupVolunteerComponent } from "./signup-volunteer/signup-volunteer.component";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { ResponsiveModule } from "ngx-responsive";
import { FormioModule } from "./core/angular-formio";
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { FormListComponent } from "./form-list/form-list.component";
import { RegisterComponent } from "./register/register.component";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { Header } from "./components/header/header.component";
import { MatCheckboxModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MenubarComponent } from "./components/menubar/menubar.component";
import { MapComponent } from "./components/map/map.component";

import {
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { InfowindowComponent } from "./components/infowindow/infowindow.component";
import { LocationcardComponent } from "./components/locationcard/locationcard.component";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { LayoutModule } from "./layout/layout.module";
import { FormtypeListComponent } from "./formtype-list/formtype-list.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { FilterpageComponent } from "./components/filterpage/filterpage.component";
import { LazyLoadImageModule, ScrollHooks } from "ng-lazyload-image";
import { NgxStarsModule } from "ngx-stars";
import { initializer } from "src/utils/app-init";
import { UserDetailsComponent, UserImageDialog, UserEditDialog, } from "./components/user-details/user-details.component";
import { AddDetailsComponent } from "./components/add-details/add-details.component";
import { OpenDialogComponent } from "./components/open-dialog/open-dialog.component";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { AddfunctionComponent } from "./addfunction/addfunction.component";
import { AppAuthGuard } from "../utils/app.authguard";
import {NgxImageCompressService} from 'ngx-image-compress';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { AddformsComponent } from './addforms/addforms.component';
import { LocationCardDetailComponent } from './location-card-detail/location-card-detail.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ChartsModule } from 'ng2-charts';
import { SniscoreComponent } from './sniscore/sniscore.component';

import { NgxMapboxGLModule } from "ngx-mapbox-gl";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './landing-page/child/header/header.component';
import { BannerComponent } from './landing-page/child/banner/banner.component';
import { ContentComponent } from './landing-page/child/content/content.component';
import { FooterComponent } from './landing-page/child/footer/footer.component';
import { LandingHeaderComponent } from './landing-page/child/landing-header/landing-header.component';

const config = {
  breakPoints: {
    xs: { max: 600 },
    sm: { min: 0, max: 959 },
    md: { min: 960, max: 1279 },
    lg: { min: 1280, max: 1919 },
    xl: { min: 1920 },
  },
  debounceTime: 100,
};

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MapsComponentComponent,
    GraphsComponent,
    MobileMapContentComponent,
    SignupVolunteerComponent,
    FormBuilderComponent,
    FormListComponent,
    Header,
    MenubarComponent,
    MapComponent,
    InfowindowComponent,
    LocationcardComponent,
    GoogleMapsComponent,
    NotificationComponent,
    FormtypeListComponent,
    FilterpageComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserImageDialog,
    UserEditDialog,
    AddDetailsComponent,
    OpenDialogComponent,
    AddDialogComponent,
    AddfunctionComponent,
    LanguageSelectorComponent,
    AddformsComponent,
    LocationCardDetailComponent,
    SniscoreComponent,
    LandingPageComponent,
    HeaderComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    LandingHeaderComponent,
    // SidebarComponent,
    // AdminHeaderComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    ChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SelectDropDownModule,
    LayoutModule,
    Ng2SearchPipeModule,
    FormlyModule.forRoot(),
    ToasterModule.forRoot(),
    FormioModule,
    FormlyBootstrapModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgxStarsModule,
    TreeviewModule.forRoot(),
    AgmCoreModule.forRoot({
      clientId: "<mandatory>",
      language: "en",
      libraries: ["geometry", "places"],
      apiKey: environment.maps_api_key,
    }),
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LazyLoadImageModule.forRoot(ScrollHooks),
    ResponsiveModule.forRoot(config),
    FlatpickrModule.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken:
        "pk.eyJ1IjoicmFtZXNoY3NlaXQiLCJhIjoiY2tlanIybGY2MHgwcTJ0bzZjYm02enllbiJ9.9zZSOVLBiD4Ya9wIaDEzsA",
    })
  ],
  providers: [
    CommonService,
    GoogleAnalyticsService,NgxImageCompressService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
    AppAuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    GoogleMapsComponent,
    UserImageDialog,
    UserEditDialog,
    AddDetailsComponent,
  ],
})
export class AppModule { }
