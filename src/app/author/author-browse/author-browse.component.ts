import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../shared/models/Author.model';
import { AuthorBrowseService } from '../services/author-browse.service';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { TabComponentService } from 'src/app/shared/services/tab-component.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAuthorDialogComponent } from './delete-author-dialog/delete-author-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'app-author-browse',
  templateUrl: './author-browse.component.html',
  styleUrls: ['./author-browse.component.css']
})
export class AuthorBrowseComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'famousBooks', 'country', 'dateOfBirth', 'numberOfBooksPublished', 'rating', 'genres', 'viewImage', 'edit', 'delete'];
  public authorTable: MatTableDataSource<Author>;
  isVisible: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _authorBrowseService: AuthorBrowseService, private _tabs: TabComponentService, private _matdialog: MatDialog, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.populateAuthors();
  }

  private populateAuthors(): void {
    this._authorBrowseService.getAuthors().subscribe(response => this.getAuthorSubscribe(new GenericResponse(response)));
  }

  private getAuthorSubscribe(response: GenericResponse): void {
    let authors: Author[] = this._authorBrowseService.getAuthorsFromPayload(response);
     this.authorTable = new MatTableDataSource(authors);
     this.authorTable.paginator = this.paginator;
  }

  createAuthor(): void {
    this._tabs.addComponentTab('Create Author');
  }

  refresh(): void {
    this.populateAuthors();
  }

  edit(row: Author): void {
    this._tabs.addComponentTab('Edit Author', row);
  }

  delete(row: Author): void {
    this._matdialog.open(DeleteAuthorDialogComponent).afterClosed().subscribe(result => {
      if(<string>result == 'true') {
        this._authorBrowseService.deleteAuthor(row.id).subscribe(response => this.deleteAuthorSubscriber(new GenericResponse(response)));
      }
    });
  }

  private deleteAuthorSubscriber(response: GenericResponse) : void {
    if(response.isSuccess) {
      this.populateAuthors();
    }
    else {
      this._snack.open(<string>response.message, 'close');
    }
  }

  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase());
    this.authorTable.filter = filterValue.trim().toLowerCase();
  }

  viewImage(author: Author) : void {
    this._authorBrowseService.getAuthorImage(author.id).subscribe(x => this.viewImageSubscribe(new GenericResponse(x)));
  }

  private viewImageSubscribe(response: GenericResponse) {
    this._matdialog.open(ViewImageComponent, {data: response});
    // if(response.isSuccess){
    //   console.log(response.payload);
    //   // const imageSrc: string = 'data:image/' + response.payload.format +';base64,' + response.payload.file;
      
    // }
  }
}
