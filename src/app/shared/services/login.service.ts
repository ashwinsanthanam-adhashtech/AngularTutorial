import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse.model';
import { LoginContainer } from '../models/LoginContainer.model';
import { BrowserStorageService } from './browser-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private _browserStorage: BrowserStorageService, private _router: Router) { }

  login(loginContainer: LoginContainer): Observable<GenericResponse> {
    console.log('logging in..');
    let body = { loginName: loginContainer.loginName, password: loginContainer.password };
    return this._http.post<GenericResponse>(environment.api_url + '/login', body);
  }

  loginSubscriber(response: GenericResponse, loginName: string): string {
    console.log('loginSubscriber');
    console.log(response);
    if(response.isSuccess) {
      this._browserStorage.setToken(response.payload);
      this._browserStorage.setUserName(loginName);
      this._router.navigate(['/home']);
      return '';
    }
    return <string>response.message;
  }
}
