import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { ComponentTab } from '../shared/models/ComponentTab.model';
import { TabComponentService } from '../shared/services/tab-component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isSideNavOpen: boolean = false;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private _tabComponentService: TabComponentService) { }
  ngAfterViewInit(): void {
    console.log('init ');
    console.log(this.container);
    this._tabComponentService.initContainer(this.container);
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
