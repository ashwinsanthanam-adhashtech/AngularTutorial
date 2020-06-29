import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { CreateBookComponent } from './create-book/create-book.component';
import { ChooseAuthorDialogComponent } from './choose-author-dialog/choose-author-dialog.component';


@NgModule({
  declarations: [CreateBookComponent, ChooseAuthorDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class BookModule { }
 