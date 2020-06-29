import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/shared/services/signup.service';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { TabComponentService } from 'src/app/shared/services/tab-component.service';

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
  user: User = null;

  constructor(private _signupService: SignupService, public dialog: MatDialog, private _tab: TabComponentService) { }

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
      dialogref.afterClosed().subscribe(x => location.reload());
    }
    else{
      this.resultMessage = <string>response.message;
    }
  }

}
