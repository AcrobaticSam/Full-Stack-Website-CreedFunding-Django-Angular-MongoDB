import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { NavbarService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;

  constructor(
    private authservice: AuthService,
    private navbarService: NavbarService,
    private cookieService: CookieService,
    private router: Router) {


    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },
      //{ path: 'admin', component: AdminComponent },
    );
   }


  ngOnInit(): void {

    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.navbarService.updateLoginStatus(false);
    this.cookieService.delete('mr-token');
    this.router.navigate(['/login']);
    //alert("Logout done!")
  }

}
