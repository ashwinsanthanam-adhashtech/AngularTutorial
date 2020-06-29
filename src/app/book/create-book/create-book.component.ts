import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/Book.model';
import { MatDialog } from '@angular/material/dialog';
import { ChooseAuthorDialogComponent } from '../choose-author-dialog/choose-author-dialog.component';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  isVisible: boolean = true;
  book: Book;

  constructor(private _matDialog: MatDialog) { 
    this.book = new Book();
  }

  ngOnInit(): void {
  }

  chooseAuthor(): void {
    this._matDialog.open(ChooseAuthorDialogComponent);
  }

}
