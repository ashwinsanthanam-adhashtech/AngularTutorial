import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _browserStorage: BrowserStorageService) {
  }

  isLoggedIn(): boolean {
    let token = this._browserStorage.getToken();
    return token != null && token != '';
  }

  logout(): void {
    this._browserStorage.setToken('');
  }
}
