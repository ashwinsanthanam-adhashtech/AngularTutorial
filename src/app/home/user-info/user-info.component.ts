import { Component, OnInit, Input } from '@angular/core';
import { InfoCard } from 'src/app/shared/models/InfoCard.model';
import { HomeService } from 'src/app/shared/services/home.service';
import { User } from 'src/app/shared/models/User.model';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { TabComponentService } from 'src/app/shared/services/tab-component.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  
  personalDetails: InfoCard[];
  loginDetails: InfoCard[];
  @Input() isVisible: boolean = true;
  private user: User;
  
  constructor(private _homeService: HomeService, private _tabs: TabComponentService) { }

  ngOnInit(): void {
    this._homeService.fetchUserInfo().subscribe(response => this.fetchUserSubscribe(new GenericResponse(response)));
  }

  private fetchUserSubscribe(response: GenericResponse): void {
    if(response.isSuccess) {
      this.user = <User>response.payload;
      this.personalDetails = this._homeService.getPersonalInfo(this.user);
      this.loginDetails = this._homeService.getLoginInfo(this.user);
    }
  }

  editUser(): void {
    this._tabs.addComponentTab('Edit Account', this.user);
  }
}
