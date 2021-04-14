import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  hide = true;
  isLoggedIn = false;
  logFailed = false;
  role = '';
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private authservice: AuthService,
    private router: Router,
    private navbarService: NavbarService,) { }

  ngOnInit(): void {

  }

  registerUser() {

    this.authservice.registerNewUser(this.authForm.value).subscribe(
      result => {
        //alert('Successs!')
        this.router.navigate(['/home']);

        if (this.username.value == "admin") {
          this.navbarService.updateNavAfterAuth('admin');
          this.role = 'admin';
        }
        else {
          this.navbarService.updateNavAfterAuth('user');

          this.role = 'user';
        }
        this.navbarService.updateLoginStatus(true);
        this.logFailed = false;

      },
      error => { console.log(error); this.logFailed = true;}
    );

  }

  get username() {
    return this.authForm.get('username')
  }
  get email() {
    return this.authForm.get('email')
  }
  get password() {
    return this.authForm.get('password')
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
