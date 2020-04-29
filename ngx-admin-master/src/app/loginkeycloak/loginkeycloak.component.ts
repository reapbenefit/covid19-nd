import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  fnValidateCredential(formData){
      console.log('Inside fnValidateCredential',formData.value);
      if(formData.value.userName == "admin" && formData.value.password == "admin")
       this.router.navigate(['/pages']);
      else
       this.loginerr = true;

     
  }

}
