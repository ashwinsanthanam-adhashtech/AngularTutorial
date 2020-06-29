import { Component, OnInit, Input } from '@angular/core';
import { TabComponentService } from 'src/app/shared/services/tab-component.service';
import { CreateauthorService } from '../services/createauthor.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Author } from 'src/app/shared/models/Author.model';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {

  isVisible: boolean = true;

  createAuthorForm: FormGroup;  
  @Input() authorInput: Author;
  image: File;
  
  constructor(private _tabs:TabComponentService, private _createAuthorService: CreateauthorService) { }

  ngOnInit(): void {
    if(this.authorInput) {
      this.createAuthorForm = new FormGroup({
        firstName: new FormControl(this.authorInput.firstName, Validators.required),
        lastName: new FormControl(this.authorInput.lastName, Validators.required),
        famousBooks: new FormControl(this.authorInput.famousBooks, Validators.required),
        country: new FormControl(this.authorInput.country, Validators.required),
        dateOfBirth: new FormControl(this.authorInput.dateOfBirth, Validators.required),
        numberOfBooksPublished: new FormControl(this.authorInput.numberOfBooksPublished, Validators.required),
        rating: new FormControl(this.authorInput.rating, [Validators.required, Validators.pattern('^[1-5]{1}$')]),
        generes: new FormControl(this.authorInput.genres, Validators.required)
      });
      this.image = this.authorInput.image;
    }
    else{
      this.createAuthorForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        famousBooks: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required),
        numberOfBooksPublished: new FormControl('', Validators.required),
        rating: new FormControl('', [Validators.required, Validators.pattern('^[1-5]{1}$')]),
        generes: new FormControl('', Validators.required)
      });
    }
  }

  submit() : void {
    if(!this.createAuthorForm.valid) {
      return;
    }
    let author: Author = this.getAuthor();
    if(this.authorInput){
      author.id = this.authorInput.id;  
    }
    console.log(this.image);
    this._createAuthorService.createAuthor(author).subscribe(response => this.createAuthorSubcribe(new GenericResponse(response)));
  }

  private getAuthor(): Author {
    let author: Author = new Author();
    author.firstName = this.createAuthorForm.value.firstName;
    author.lastName = this.createAuthorForm.value.lastName;
    author.famousBooks = this.createAuthorForm.value.famousBooks;
    author.country = this.createAuthorForm.value.country;
    author.dateOfBirth = this.createAuthorForm.value.dateOfBirth;
    author.numberOfBooksPublished = this.createAuthorForm.value.numberOfBooksPublished;
    author.rating = this.createAuthorForm.value.rating;
    author.genres = this.createAuthorForm.value.generes;
    author.image = this.image;
    
    return author;
  }

  private createAuthorSubcribe(response: GenericResponse): void {
    if(response.isSuccess) {
      this._tabs.closeTabByComponent(this);
    }
  }

  handleFileInput(files: FileList) {
    this.image = files.item(0);
  }
}
