import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserRoleService} from '../user-role.service'
@Component({
  selector: 'ngx-loginkeycloak',
  templateUrl: './loginkeycloak.component.html',
  styleUrls: ['./loginkeycloak.component.css']
})
export class LoginkeycloakComponent implements OnInit {

  userName: string = '';
  password: string = '';
  loginerr = false;
  startSpinner = false;

  constructor(private router: Router,private User:UserRoleService) { }

  ngOnInit() {
  }

  fnValidateCredential(formData){
      console.log('Inside fnValidateCredential',formData.value);
      if(formData.value.userName == "admin" && formData.value.password == "admin")
      {
        this.User.setUserRole("admin");
        this.router.navigate(['/pages']);
      }
      else if(formData.value.userName == "supadmin" && formData.value.password == "supadmin")
      {
        this.User.setUserRole("supadmin");
        this.router.navigate(['/pages']);
        
      }
      else if(formData.value.userName == "user" && formData.value.password == "user")
      {
        this.User.setUserRole("user");
        this.router.navigate(['/pages']);
      }
      else{
        this.loginerr = true;
      }

     
  }

}
