import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../common/Login';
import { Register } from '../common/Register';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/api/v1/';

  constructor(private http: HttpClient) { }

  login(userData: Login): Observable<any> {
    return this.http.post(this.url + 'login', userData);
  }
  register(user: Register): Observable<any> {
    return this.http.post(this.url + 'signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + 'send-mail-forgot-password', email);
  }
}
