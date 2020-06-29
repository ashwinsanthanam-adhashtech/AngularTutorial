import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse.model';
import { LoginContainer } from '../models/LoginContainer.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(loginContainer: LoginContainer): Observable<GenericResponse> {
    let body = { loginName: loginContainer.loginName, password: loginContainer.password };
    return this._http.post<GenericResponse>(environment.api_url + '/login', body);
  }
}
