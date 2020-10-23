import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupVolunteerComponent } from "./signup-volunteer/signup-volunteer.component";
import { MobileMapContentComponent } from "./mobile-map-content/mobile-map-content.component";
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { FormListComponent } from "./form-list/form-list.component";
import { MapComponent } from "./components/map/map.component";
import { FormtypeListComponent } from "./formtype-list/formtype-list.component";
import { FilterpageComponent } from "./components/filterpage/filterpage.component";
import { RegisterComponent } from "./register/register.component";
import { OpenDialogComponent } from "./components/open-dialog/open-dialog.component";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { AddfunctionComponent } from "./addfunction/addfunction.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { AppAuthGuard } from "../utils/app.authguard";
import { AppComponent } from "./app.component";
import { LocationCardDetailComponent } from './location-card-detail/location-card-detail.component';
import { AddformsComponent } from './addforms/addforms.component';
import { SniscoreComponent } from './sniscore/sniscore.component';
const routes: Routes = [
  {
    path: "registration",
    component: RegisterComponent,
    pathMatch: "full",
  },
  {
    path: "addfunction",
    component: AddfunctionComponent,
    pathMatch: "full",
    canActivate: [AppAuthGuard],
  },
  {
    path: "userdetails",
    component: UserDetailsComponent,
    pathMatch: "full",
    canActivate: [AppAuthGuard],
  },
  {
    path: "formbuilder",
    component: FormBuilderComponent,
    pathMatch: "full",
    canActivate: [AppAuthGuard],
  },
  {
    path: "formlist",
    component: FormListComponent,
    pathMatch: "full",
  },
  {
    path: "formtypelist",
    component: FormtypeListComponent,
    pathMatch: "full",
  },
  {
    path: "signupvolunteer",
    component: SignupVolunteerComponent,
    pathMatch: "full",
  },
  {
    path: "locationcardDetail/:type/:id",
    component: LocationCardDetailComponent,
    pathMatch: "full",
  },
  {
    path: "addforms/:type/:index/:id",
    component: AddformsComponent,
    pathMatch: "full",
    canActivate: [AppAuthGuard]
  },
  {
    path: "sniscore",
    component: SniscoreComponent,
    pathMatch: "full",
    canActivate: [AppAuthGuard]
  },
  {
    path: "app/:city",
    component: AppComponent,
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
