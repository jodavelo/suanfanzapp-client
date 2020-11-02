import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserI } from '../interfaces/UserI';
import { HttpClient } from "@angular/common/http";
import { LoginI } from '../interfaces/LoginI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserI | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  loginMail(user: LoginI):Observable<any> {
    // const passKey = "suanfanzon";
    // if (user.contrasena === passKey) {
    //   this.user = user;
    //   window.localStorage.setItem('user', JSON.stringify(this.user));
    // }
    return this.httpClient.post(environment.url_api+'user/login-mail', user);
  }

  loginPhone(user: LoginI):Observable<any> {
    // const passKey = "suanfanzon";
    // if (user.contrasena === passKey) {
    //   this.user = user;
    //   window.localStorage.setItem('user', JSON.stringify(this.user));
    // }
    return this.httpClient.post(environment.url_api+'user/login-phone', user);
  }
  

  // tslint:disable-next-line:typedef
  isLogged(){
    return window.localStorage.getItem('user') ? true : false;
  }

  // tslint:disable-next-line:typedef
  isLoggedIn(){
    if (localStorage.getItem('user')){
      return true;
    }
  }

  // tslint:disable-next-line:typedef
  logout(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }
}
