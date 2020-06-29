import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { AuthorBrowseComponent } from './author-browse/author-browse.component';

import { AuthorBrowseService } from './services/author-browse.service';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { DeleteAuthorDialogComponent } from './author-browse/delete-author-dialog/delete-author-dialog.component';
import { ViewImageComponent } from './view-image/view-image.component';

@NgModule({
  declarations: [
    AuthorBrowseComponent,
    CreateAuthorComponent,
    DeleteAuthorDialogComponent,
    ViewImageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AuthorBrowseComponent
  ],
  providers: [
    AuthorBrowseService
  ]
})
export class AuthorModule { }
