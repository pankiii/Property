import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertyfy: AlertyfyService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  get name() {
    return this.loginForm.get('name');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSave() {
    console.log(this.loginForm.value);
    let token = this.authService.authUser(this.loginForm.value);
    console.log(token);
    if (token.length) {
      localStorage.setItem('token', token[0].name);
      this.alertyfy.success('Login Successfully');
      this.router.navigate(['/'])
    } else {
      this.alertyfy.error('UserName or Password is Wrong');
    }
  }
}
