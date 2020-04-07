import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login : LoginService) { }

  ngOnInit(): void {


  }

  spotifyLogin(){ 
      console.log('login');
      this.login.spotifyLogin();
  }

}
