import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private User="";
  private Username="";
  constructor() {

   }
  getUserRole()
  {
    return this.User;
  }
  setUserRole(role:any)
  {
    this.User=role;
  }
  setUserName(name:any)
  {
    this.Username=name;
  }
  getUserName()
  {
    return this.Username;
  }
}
