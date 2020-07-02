import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { BrowserStorageService } from 'src/app/shared/services/browser-storage.service';
import { LoginContainer } from 'src/app/shared/models/LoginContainer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginContainer: LoginContainer;
  private static _valid: string = 'valid';
  private static _invalid: string = 'invalid';

  constructor(
    private _loginService: LoginService, 
    private _browserStorage: BrowserStorageService, 
    private _router: Router) { 

    }

  ngOnInit(): void {
    this.loginContainer = new LoginContainer();
  }

  login(): void {
    this.loginContainer.hitSubmit();
    if(this.loginContainer.isValid)
    {
      this._loginService.login(this.loginContainer).
      subscribe(response => this.loginContainer.resultMessage = this._loginService.loginSubscriber(new GenericResponse(response), <string>this.loginContainer.loginName));
    }
  }


}
