import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http: HttpClient, private _browserstorage: BrowserStorageService) { }

  signup(user: User): Observable<GenericResponse> {
    console.log(user);
    return this._http.post<GenericResponse>(environment.api_url + '/user', user);
  }

  edit(user: User): Observable<GenericResponse> {
    console.log(user);
    const headers = {authorization: 'Bearer ' + this._browserstorage.getToken()};
    return this._http.post<GenericResponse>(environment.api_url + '/user/edit', user, { headers: headers});
  }
}
