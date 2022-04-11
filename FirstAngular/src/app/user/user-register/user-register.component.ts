import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted:boolean;
  constructor(private userService:UserServiceService,private alertyfy:AlertyfyService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmpsd: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
        ]),
      },
      this.passwordValidator
    );
  }
  passwordValidator(form: AbstractControl): Validators {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmpsd').value;
    if (password === confirmPassword) {
      return null;
    } else {
      return { notMatched: true };
    }
  }
  // Getter Methods For All Form Controls
  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmpsd') as FormControl;
  }
  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
  onSubmit() {
    this.userSubmitted=true;
    console.log(this.registrationForm);
    if(this.registrationForm.valid){
    // this.user = Object.assign(this.user, this.registrationForm.value);
    this.userService.addUsersData(this.userData());
    this.registrationForm.reset();
    this.userSubmitted=false;
    this.alertyfy.success("Congratulations!!!, You are registerd");
    }else{
      this.alertyfy.error("Please fill the form")
    }
  }
userData():User{
return this.user = {
  name:this.name.value,
  email:this.email.value,
  password:this.password.value,
  confirmPassword:this.confirmPassword.value,
  mobile:this.mobile.value
}
}
}
