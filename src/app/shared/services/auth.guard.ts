import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService, private _router: Router) {
    
  }

  async canActivate() : Promise<boolean> {
    let result: boolean = true;
    await this._authService.isLoggedIn_API().then((isLoggedIn: boolean) => result = this.processPromise(isLoggedIn));
    return result;
  }

  private processPromise(isLoggedIn: boolean) : boolean {
    if(!isLoggedIn) {
      this._router.navigate(['/login-signup']);
    }
    return isLoggedIn;
  }
}
