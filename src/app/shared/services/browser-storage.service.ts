import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  private tokenKey: string = 'token';
  private userNameKey: string = 'userName';
  private oauthSignupStatusKey: string = 'oauthSignupStatus';

  constructor() { }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    return localStorage.setItem(this.tokenKey, token);
  }

  getUserName() : string {
    return localStorage.getItem(this.userNameKey);
  }

  setUserName(userName: string): void {
    localStorage.setItem(this.userNameKey, userName);
  }

  clear(): void {
    localStorage.clear();
  }

  get role(): string {
    try {
      return jwt_decode(this.getToken()).role;
    }
    catch {
      return '';
    }
  }

  setOAuthSignupStatus(status: boolean): void {
    localStorage.setItem(this.oauthSignupStatusKey, status + '');
  }

  getOAuthSignupStatus(): boolean {
    return localStorage.getItem(this.oauthSignupStatusKey) == (true + '');
  }
  
}
