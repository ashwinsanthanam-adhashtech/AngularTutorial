import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  imagePath: string = environment.loginSignupBackground;

  constructor(private _authService: AuthService, private _router: Router) {
    if(this._authService.isLoggedIn_API()) {
      this._router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
  }

}
