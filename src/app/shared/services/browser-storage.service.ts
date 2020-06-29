import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  private tokenKey: string = 'token';
  private userNameKey: string = 'userName';

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
}
