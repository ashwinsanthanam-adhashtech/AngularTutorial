import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from './browser-storage.service';
import { GenericResponse } from '../models/GenericResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private _http: HttpClient, private _browserStorage: BrowserStorageService) { }

  resetPassword(password: string) : Observable<GenericResponse> {
    const headers = { authorization: 'Bearer ' + this._browserStorage.getToken() };
    return this._http.post<GenericResponse>(environment.api_url + '/user/resetPassword', { password: password }, { headers: headers });
  }

  resetPasswordSubcribe(response: GenericResponse) : GenericResponse {
    response = new GenericResponse(response);
    console.log(response);
    if(response.isSuccess) {
      this._browserStorage.setOAuthSignupStatus(false);
    }
    return response;
  }
}
