import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import AuthGuard from './services/authguard';
import { ShowCardComponent } from './show-card/show-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowComponent } from './show/show.component';
import { LoadingComponent } from './loading/loading.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'show/:show', component: ShowComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', 
    redirectTo: 'home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CallbackComponent,
    HomeComponent,
    ShowCardComponent,
    NavbarComponent,
    ShowComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
