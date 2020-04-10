import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService, saveUserLS } from '../services/login';
import { AccessToken } from '../models/api_models';
import { paramsToObject } from '../services/util';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private login : LoginService) { }
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string;

  ngOnInit(): void {

    this.loading = true;
    const code = this.route.snapshot.queryParamMap.get('code');
    const returnUrl = this.route.snapshot.queryParamMap.get('state');

    this.login.getToken(code)
    .then((auth: AccessToken ) => {
      saveUserLS(auth);

      let urlGo = returnUrl || 'home';
      let split = urlGo.split('?');
      urlGo = split[0];

      let params = split[1] as any;
      if(params) {
        params = paramsToObject(params);
      }

      this.router.navigate([ urlGo ], {
        queryParams: params
      });
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
