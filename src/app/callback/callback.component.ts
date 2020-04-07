import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login';

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
    .then(token => {
      localStorage.clear();
      localStorage.setItem('current_user', JSON.stringify(token));
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
