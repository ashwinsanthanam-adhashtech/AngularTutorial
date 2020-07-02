import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { TabComponentService } from 'src/app/shared/services/tab-component.service';
import { SocialAuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from 'src/app/shared/services/login.service';
import { LoginContainer } from 'src/app/shared/models/LoginContainer.model';
import { BrowserStorageService } from 'src/app/shared/services/browser-storage.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  resultMessage: string = '';

  isVisible: boolean = true;
  isSignup: boolean = true;
  _isOAuthCreated: boolean = false;
  user: User = null;

  constructor(
      private _signupService: SignupService, 
      public dialog: MatDialog, 
      private _tab: TabComponentService,
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private _socialAuth: SocialAuthService,
      private _loginService: LoginService,
      private _browserStorage: BrowserStorageService)
      {
        this._matIconRegistry.addSvgIcon('google', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/google.svg'));
        this._matIconRegistry.addSvgIcon('facebook', this._domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/facebook.svg'));
        
        this._socialAuth.authState.subscribe((socialUser: SocialUser) => this.oAuthSubscribe(socialUser));
      }

  ngOnInit(): void {
    if(this.user == null) {
      this.user = new User();
    }
    this.signupForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      loginName: new FormControl(this.user.loginName, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
      mobileNumber: new FormControl(this.user.mobileNumber, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      emailId: new FormControl(this.user.email, [Validators.required, Validators.pattern('^[0-9a-zA-z\.]+@[0-9a-zA-z]\.[0-9a-zA-z]+$')])
    });
  }

  submit(): void {
    this._isOAuthCreated = false;
    if(this.signupForm.invalid){
      console.log('invalid');
      return;
    }
    let user: User = this.getUser();
    if(this.isSignup) {
      this._signupService.signup(user).subscribe(response => this.signupSubscribe(new GenericResponse(response)));
      console.log(this.signupForm.value);
    }
    else{
      this._signupService.edit(user).subscribe(x => {
        const response: GenericResponse = new GenericResponse(x);
        if(response.isSuccess) {
          this._tab.closeTabByComponent(this);
        }
        console.log(response);
      });
    }
  }

  signupWithGoogle(): void {
    this._isOAuthCreated = true;
    this._socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signupWithFacebook(): void {
    this._isOAuthCreated = true;
    this._socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  private oAuthSubscribe(socialUser: SocialUser): void {
    
    this.user.firstName = socialUser.firstName;
    this.user.email = socialUser.email;
    this.user.password = 'password';
    this.user.lastName = socialUser.lastName;
    this.user.loginName = socialUser.name;
    this.user.mobileNumber = '';

    this.submitUser(this.user);
  }

  private submitUser(user: User) {
    this._signupService.signup(user).subscribe(response => this.signupSubscribe(new GenericResponse(response)));
    console.log(this.signupForm.value);
  }

  private getUser(): User {
    let user: User = new User();
    user.id = this.user.id;
    user.firstName = this.signupForm.value.firstName;
    user.lastName = this.signupForm.value.lastName;
    user.email = this.signupForm.value.emailId;
    user.mobileNumber = this.signupForm.value.mobileNumber;
    user.password = this.signupForm.value.password;
    user.loginName = this.signupForm.value.loginName;

    return user;
  }

  private signupSubscribe(response: GenericResponse) : void {
    console.log(response);
    if(response.isSuccess) {
      let dialogref: MatDialogRef<SignupDialogComponent> = this.dialog.open(SignupDialogComponent, {data: <User> response.payload});
      dialogref.afterClosed().subscribe(x => this.dialogAfterClosed());
    }
    else{
      this.resultMessage = <string>response.message;
    }
  }

  private dialogAfterClosed(): void {
    if(this._isOAuthCreated) {
      const loginContainer: LoginContainer = new LoginContainer();
      loginContainer.loginName = this.user.loginName;
      loginContainer.password = this.user.password;
      this._loginService.login(loginContainer).subscribe(response => this._loginService.loginSubscriber(new GenericResponse(response), <string>this.user.loginName));
      this._browserStorage.setOAuthSignupStatus(true);
    }
    else {
      this._browserStorage.setOAuthSignupStatus(false);
      location.reload();
    }
  }

}
