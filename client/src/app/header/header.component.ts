import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from 'src/app/services/user/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  userRole: string[];

  constructor(private userService: UserDataService) { }

  ngOnInit() {
    try {
      this.userService.$userData.subscribe((userData) => {
        console.log('userData : ', userData);
        if (userData.data['first_name']) {
          this.username = userData.data['first_name'];
        } else {
          this.username = userData.data['username'];
        }
        this.userRole = userData.data['userrole'];
      });
    } catch (e) {
      console.log('Error while fetching user details from keycloak in Header Component. Error : ', e);
    }
  }

  logout() {
    window.location.replace('/logout');
  }

}
