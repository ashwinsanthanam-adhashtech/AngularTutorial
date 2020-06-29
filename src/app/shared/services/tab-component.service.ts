import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ComponentTab } from '../models/ComponentTab.model';
import { AuthorBrowseComponent } from '../../author/author-browse/author-browse.component';
import { UserInfoComponent } from '../../home/user-info/user-info.component';
import { CreateAuthorComponent } from 'src/app/author/create-author/create-author.component';
import { Author } from '../models/Author.model';
import { SignupComponent } from 'src/app/login-signup/signup/signup.component';
import { User } from '../models/User.model';
import { CreateBookComponent } from 'src/app/book/create-book/create-book.component';

@Injectable({
  providedIn: 'root'
})
export class TabComponentService {

  componentTabs: ComponentTab[] = [];
  private _container: ViewContainerRef;
  searchBarAllowedForms: string[] = [
    'Account',
    'Author Browse',
    'Create Author',
    'Create Book'
  ];
  
  constructor(private _resolver: ComponentFactoryResolver) { }

  initContainer(container: ViewContainerRef) : void {
    this._container = container;
  }

  selectTab(selectedTab: ComponentTab): void {
    this.componentTabs.forEach(tab => {
      tab.component.isVisible = false;
    });
    selectedTab.component.isVisible = true;
    console.log(this.componentTabs);
  }  

  closeTab(tab: ComponentTab): void {
    const index: number = this.componentTabs.indexOf(tab);
    this.componentTabs.splice(index, 1);
    if(this.componentTabs.length - 1 >= index) {
      this.selectTab(this.componentTabs[index]);
    }
    else if(index - 1 >= 0) {
      this.selectTab(this.componentTabs[index - 1]);
    }
    this._container.remove(index);
  }

  addComponentTab(componentName: string, param?: any): void {
    const componentTab = new ComponentTab();
    componentTab.component = this.getComponent(componentName, param);
    componentTab.name = componentName;

    this.componentTabs.push(componentTab);
    this.selectTab(componentTab);
  }

  closeTabByComponent(component) : void {
    var tabComponent;
    this.componentTabs.forEach(tab => {
      if(tab.component == component) {
        tabComponent = tab;
      }
    });
    if(tabComponent) {
      this.closeTab(tabComponent);
    }
  }

  private getComponent(componentName: string, param?: any) : any {
    switch(componentName) {
      case 'Account':
        let accountFactory = this._resolver.resolveComponentFactory(UserInfoComponent);
        return this._container.createComponent(accountFactory).instance;
      case 'Author Browse':
        let authorBrowseFactory = this._resolver.resolveComponentFactory(AuthorBrowseComponent);
        return this._container.createComponent(authorBrowseFactory).instance;
      case 'Create Author':
        let createAuthorFactory = this._resolver.resolveComponentFactory(CreateAuthorComponent);
        return this._container.createComponent(createAuthorFactory).instance;
      case 'Edit Author':
        let editAuthorFactory = this._resolver.resolveComponentFactory(CreateAuthorComponent);
        const editAuthorcomponent = this._container.createComponent(editAuthorFactory, ).instance;
        editAuthorcomponent.authorInput = <Author>param;
        return editAuthorcomponent;
      case 'Edit Account':
        let editAccountFactory = this._resolver.resolveComponentFactory(SignupComponent);
        const editAccountComponent =  this._container.createComponent(editAccountFactory).instance;
        editAccountComponent.isSignup = false;
        editAccountComponent.user = <User>param;
        return editAccountComponent;
      case 'Create Book':
        let createBookFactory = this._resolver.resolveComponentFactory(CreateBookComponent);
        return  this._container.createComponent(createBookFactory).instance;
    }
  }
}
