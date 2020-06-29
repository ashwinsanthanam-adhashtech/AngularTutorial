import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse.model';
import { environment } from 'src/environments/environment';
import { BrowserStorageService } from './browser-storage.service';
import { InfoCard } from '../models/InfoCard.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient, private _browserStorage: BrowserStorageService) { }

  public fetchUserInfo(): Observable<GenericResponse> {
    let header = { authorization: 'Bearer ' + this._browserStorage.getToken() }
    let options = { headers: header };
    return this._http.get<GenericResponse>(environment.api_url + '/user', options);
  }

  public getPersonalInfo(user: User): InfoCard[] {
    return [
      { name: 'First Name', value: user.firstName },
      { name: 'Last Name', value: user.lastName },
      { name: 'Mobile', value: user.mobileNumber },
      { name: 'Email', value: user.email }
    ];
  }

  public getLoginInfo(user: User): InfoCard[] {
    return [
      { name: 'Login Name', value: user.loginName },
      { name: 'Password', value: '*****' },
    ];
  }
}
