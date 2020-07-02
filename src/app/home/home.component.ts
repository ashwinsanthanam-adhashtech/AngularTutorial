import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ComponentTab } from '../shared/models/ComponentTab.model';
import { TabComponentService } from '../shared/services/tab-component.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserStorageService } from '../shared/services/browser-storage.service';
import { ForcePasswordResetComponent } from './force-password-reset/force-password-reset.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isSideNavOpen: boolean = false;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private _tabComponentService: TabComponentService, private _dialog: MatDialog, private _browserStorage: BrowserStorageService) { }
  ngAfterViewInit(): void {
    console.log('init ');
    console.log(this.container);
    this._tabComponentService.initContainer(this.container);
    
    if(this._browserStorage.getOAuthSignupStatus()) {
      this._dialog.open(ForcePasswordResetComponent, { disableClose: true });
    }
  }
  
  ngOnInit(): void {
    
  }

  get componentTabs(): ComponentTab[] {
    return this._tabComponentService.componentTabs;
  }

  addComponentTab(componentName: string): void {
    this._tabComponentService.initContainer(this.container);
    this._tabComponentService.addComponentTab(componentName);
  }

  selectTab(selectedTab: ComponentTab): void {
    this._tabComponentService.selectTab(selectedTab);
  }

  close(tab: ComponentTab): void {
    this._tabComponentService.closeTab(tab);
  }
}
