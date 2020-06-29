import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  image: string;
  message: string;
  success: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public response: GenericResponse) {
    response = new GenericResponse(response);
    console.log(response);
    this.success = response.message == 'Success';
    if(this.success) {
      this.image = 'data:image/' + response.payload.format +';base64,' + response.payload.file;
    }
    else {
      this.message = <string>response.message;
    }
  }

  ngOnInit(): void {
  }

}
