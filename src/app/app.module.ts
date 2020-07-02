import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login-signup/login/login.component';
import { BrowserStorageService } from './shared/services/browser-storage.service';
import { AuthService } from './shared/services/auth.service';
import { SignupComponent } from './login-signup/signup/signup.component';
import { LoginService } from './shared/services/login.service';
import { AuthGuard } from './shared/services/auth.guard';
import { SignupService } from './shared/services/signup.service';
import { HomeComponent } from './home/home.component';
import { HomeService } from './shared/services/home.service';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { SignupDialogComponent } from './login-signup/signup/signup-dialog/signup-dialog.component';
import { EditUserComponent } from './home/edit-user/edit-user.component';
import { ForcePasswordResetComponent } from './home/force-password-reset/force-password-reset.component';

const googleOAuthClientId: string = '1012967069498-auq9gbl6rigsku6eq4tms67oqud1seo0.apps.googleusercontent.com';
const facebookOauthAppId: string = '279105980208522';

let config: SocialAuthServiceConfig = {
  providers: [
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(googleOAuthClientId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebookOauthAppId)
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserInfoComponent,
    SignupDialogComponent,
    EditUserComponent,
    ForcePasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    SocialLoginModule.initialize(config),
    OAuthModule.forRoot(),
    AuthorModule,
    BookModule
  ],
  entryComponents: [
    SignupDialogComponent
  ],
  providers: [
    BrowserStorageService, 
    AuthService, 
    LoginService, 
    AuthGuard,
    SignupService,
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
