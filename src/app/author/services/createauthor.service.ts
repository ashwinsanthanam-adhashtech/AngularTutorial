import { Injectable } from '@angular/core';
import { Author } from 'src/app/shared/models/Author.model';
import { BrowserStorageService } from 'src/app/shared/services/browser-storage.service';
import { HttpClient } from '@angular/common/http';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateauthorService {

  constructor(private _browserStorage: BrowserStorageService, private _http: HttpClient) { }

  public createAuthor(author: Author): Observable<GenericResponse> {
    const headers = { authorization: 'Bearer ' +  this._browserStorage.getToken() };
    const options = { headers: headers}
    const formData: FormData = new FormData();
    for (var key in author) {
      formData.append(key, author[key]);
    }
    return this._http.post<GenericResponse>(environment.api_url + '/author', formData, options);
  }

}
