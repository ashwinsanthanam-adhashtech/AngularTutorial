import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/shared/services/browser-storage.service';
import { PasswordResetService } from 'src/app/shared/services/password-reset.service';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-force-password-reset',
  templateUrl: './force-password-reset.component.html',
  styleUrls: ['./force-password-reset.component.css']
})
export class ForcePasswordResetComponent implements OnInit {

  constructor(private _passwordResetService: PasswordResetService, private _dialogRef: MatDialogRef<ForcePasswordResetComponent>) { }

  password: string;
  get isValid(): boolean {
    return this.password != null && this.password != '';
  }

  submit(): void {
    if(!this.isValid) {
      return;
    }
    
    this._passwordResetService.
      resetPassword(this.password).
      subscribe((response: GenericResponse) => this.resetPasswordSubscriber(response));
  }

  ngOnInit(): void {
  }

  private resetPasswordSubscriber(response: GenericResponse): void {
    response = new GenericResponse(response);
    response = this._passwordResetService.resetPasswordSubcribe(response);
    if(response.isSuccess) {
      this._dialogRef.close();
    }
  }
}
