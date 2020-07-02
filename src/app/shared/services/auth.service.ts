import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/GenericResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _browserStorage: BrowserStorageService, private _http: HttpClient) {
  }

  isLoggedIn(): boolean {
    let token = this._browserStorage.getToken();
    return token != null && token != '';
  }

  async isLoggedIn_API(): Promise<boolean> {
    let result: boolean = false;
    let token = this._browserStorage.getToken();
    await this._http.post<GenericResponse>(environment.api_url + '/login/verify/' + token, null).
    toPromise().
    then((response: GenericResponse) => result = this.processPromise(new GenericResponse(response))).
    catch((response: GenericResponse) => result = this.processCatch(new GenericResponse(response)));
    return result;
  }

  private processPromise(response: GenericResponse) : boolean {
    return response.isSuccess;
  }

  private processCatch(response: GenericResponse) : boolean {
    console.log(response);
    return false;
  }

  logout(): void {
    this._browserStorage.clear();
  }

  get isAdmin(): boolean {
    return this._browserStorage.role == 'Admin';
  }
}
