import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    AdminHeaderComponent,
    SidebarComponent
  ],
  declarations: [
    AdminHeaderComponent,
    SidebarComponent,
    AdminLayoutComponent
  ]
})
export class LayoutModule { }
