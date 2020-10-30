import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../interfaces/UserI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserI | undefined;

  constructor(
    private router: Router
  ) { }

  // tslint:disable-next-line:typedef
  login(user: UserI){
    const passKey = 'Hola123.';
    if (user.password === passKey){
      this.user = user;
      window.localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  // tslint:disable-next-line:typedef
  isLogged(){
    return window.localStorage.getItem('user') ? true : false;
  }

  // tslint:disable-next-line:typedef
  isLoggedIn(){
    if (localStorage.getItem('isLoggedin')){
      return true;
    }
  }

  // tslint:disable-next-line:typedef
  logout(){
    window.localStorage.clear();
    this.router.navigate(['login']);
  }
}
