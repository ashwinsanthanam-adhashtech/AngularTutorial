import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login-signup', component: LoginSignupComponent },
  // { path: '', component: LoginSignupComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
