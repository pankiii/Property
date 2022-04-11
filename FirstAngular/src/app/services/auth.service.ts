import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
authUser(user:any){
let userData = JSON.parse(localStorage.getItem('UsersData'));
if(localStorage.getItem('UsersData')){
  userData=JSON.parse(localStorage.getItem('UsersData'));
  return userData.filter((item:any) => item.name === user.name && item.password === user.password);
}
}
}
