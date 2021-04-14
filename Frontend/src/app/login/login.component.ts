import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavbarService } from '../services/navbar.service';


interface TokenObj {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  logFailed = false;
  role = '';

  authForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl(' ', [Validators.required])
  });
  constructor(private authservice: AuthService,
    private cookieService: CookieService,
    private navbarService: NavbarService,
    private router: Router
  ) {

    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      //this.router.navigate(['/home']);
    }
  }

  loginUsers() {
    this.authservice.loginUser(this.authForm.value).subscribe(
      (result: TokenObj) => {
        this.cookieService.set('mr-token', result.token);
        this.router.navigate(['/home']);
        //alert('login succesfull')
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
      error => {
        console.log(error);
        this.logFailed = true;
        //alert('oh no');
      },



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




}
