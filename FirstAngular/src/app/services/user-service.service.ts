import { Injectable } from '@angular/core';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }
addUsersData(user: User) {
  let users = [];
  if (localStorage.getItem('UsersData')) {
    users = JSON.parse(localStorage.getItem('UsersData'));
    users = [...users,user];
  } else {
    users = [user];
  }
  localStorage.setItem('UsersData',JSON.stringify(users))
}
}
