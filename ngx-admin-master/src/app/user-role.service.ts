import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private User="";
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
}
