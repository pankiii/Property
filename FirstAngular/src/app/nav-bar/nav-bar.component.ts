import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertyfyService } from '../services/alertyfy.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  userLogged: string;
  constructor(private alertyfy:AlertyfyService) {}

  ngOnInit() {}
  loggedIn() {
    this.userLogged = localStorage.getItem('token');
    return this.userLogged;
  }
  logout() {
    localStorage.removeItem('token');
    this.alertyfy.error("Logout Succussfully");
  }
}
