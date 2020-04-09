import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService, saveUserLS } from '../services/login';
import { AccessToken } from '../models/api_models';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private login : LoginService, private router: Router) { }
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string;

  ngOnInit(): void {

    this.loading = true;
    const code = this.route.snapshot.queryParamMap.get('code');
    this.login.getToken(code)
    .then((auth: AccessToken ) => {
      saveUserLS(auth);
      this.router.navigate(['home']);
    })
    .catch((err : Error) => {
      this.error = true;
      this.errorMessage = err.message;
      this.router.navigate(['login']);
    })
    .finally(() => {
      this.loading = false;
    })
  }

}
