import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login : LoginService, private route: ActivatedRoute) { }

  ngOnInit(): void {


  }

  spotifyLogin(){ 
      this.login.spotifyLogin(this.route.snapshot.queryParams.returnUrl);
  }

}
