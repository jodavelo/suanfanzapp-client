import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TelefonoI } from '../interfaces/TelefonoI';
import { UserI } from '../interfaces/UserI';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private url: string = 'http://localhost:5000/';

  constructor(
    private httpClient: HttpClient
  ) { }

  verifyMail(mail: string): Observable<any>{
    return this.httpClient.post(this.url+'verify-mail', {mail: mail});
  }

  verifyPhone(telefono: TelefonoI): Observable<any>{ 
    //console.log(telefono);   
    return this.httpClient.post(this.url+'verify-phone', telefono);

  }
}