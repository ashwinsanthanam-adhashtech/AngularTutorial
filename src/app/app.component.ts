import { Component } from '@angular/core';
import { BrowserStorageService } from './shared/services/browser-storage.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { TabComponentService } from './shared/services/tab-component.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularMaterialCRUD';
  searchText: string;
  searchTextFormControl: FormControl = new FormControl();

  constructor(private _browserStorage: BrowserStorageService, private _router: Router, private _authService: AuthService, private _tabs: TabComponentService) {
  }

  get canShowLogout(): boolean {
    return this._authService.isLoggedIn();
  }

  logoutUser(): void {
    if(this._authService.isLoggedIn()) {
      this._authService.logout();
      this._router.navigate(['/login-signup']);
    }
  }

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  get userName(): string {
    return this._browserStorage.getUserName();
  }

  search(): void {
    console.log(this.searchText);
    this._tabs.addComponentTab(this.searchText);
    this.searchText = '';
  }

  openAccount(): void {
    this._tabs.addComponentTab('Account');
  }

  get searchBarAllowedForms(): string[] {
    return this._tabs.searchBarAllowedForms;
  }
}
