import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/api_models';
import { LoginService } from '../services/login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  defaultImage: string = "";

  constructor(private router: Router, private login: LoginService) { 

  }

  ngOnInit() {
    this.user = this.login.getUserLS()?.user;
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
  }


  isRoute(routName: string) {
    return routName.toUpperCase() == this.router.url.toUpperCase() ? 'active' : '';
  }

}
