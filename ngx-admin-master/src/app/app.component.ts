/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { AdminService } from './service/admin.service';
import { UserRoleService } from './user-role.service';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private AdminService: AdminService,
    private User: UserRoleService,
    private analytics: AnalyticsService, private seoService: SeoService, private router: Router) { }

  ngOnInit(): void {

    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    this.checkuser();
  }

  username = '';
  userRoles = [];
  checkuser() {
    this.AdminService.getUserInfo().subscribe(res => {
      console.log(res);
      if (res['data'] && res['data']['username']) {
        this.username = res['data']['username'];
        this.userRoles = res['data']['userrole']['roles'];

        if (this.userRoles.indexOf('NGOAdmin') != -1) {
          this.User.setUserRole("supadmin");
          this.User.setUserName("supadmin");
          this.router.navigate(['/pages']);

        } else if (this.userRoles.indexOf('NGOTeam') != -1) {
          this.User.setUserRole("admin");
          this.User.setUserName(res['data']['group']);
          this.router.navigate(['/pages']);

        } else if (this.userRoles.indexOf('NGOUser') != -1) {
          this.User.setUserRole("user");
          this.router.navigate(['/pages']);
        }
      }
    })
  }

}
