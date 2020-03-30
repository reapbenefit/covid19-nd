import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    MapsComponentComponent,
    GraphsComponent
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
      clientId: '<mandatory>',
      language: 'en',
      libraries: ['geometry', 'places'],
      apiKey: environment.maps_api_key
    })
  ],
  providers: [CommonService, GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
