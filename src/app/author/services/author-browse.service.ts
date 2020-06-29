import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from 'src/app/shared/models/GenericResponse.model';
import { environment } from 'src/environments/environment';
import { Author } from 'src/app/shared/models/Author.model';
import { BrowserStorageService } from 'src/app/shared/services/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorBrowseService {

  constructor(private _http: HttpClient, private _browserStorage: BrowserStorageService) { }

  public getAuthors(): Observable<GenericResponse> {
    const headers = { authorization: 'Bearer ' +  this._browserStorage.getToken() }
    const options = { headers: headers };
    return this._http.get<GenericResponse>(environment.api_url + '/author', options);
  }

  public getAuthorsFromPayload(response: GenericResponse): Author[] {
    return <Author[]>response.payload;
  }

  public deleteAuthor(id: string): Observable<GenericResponse> {
    const headers = { authorization: 'Bearer ' +  this._browserStorage.getToken() }
    const options = { headers: headers };
    return this._http.delete<GenericResponse>(environment.api_url + '/author/' + id, options);
  }

  public getAuthorImage(id: string) : Observable<GenericResponse> {
    const headers = { authorization: 'Bearer ' +  this._browserStorage.getToken() }
    const options = { headers: headers };
    return this._http.get<GenericResponse>(environment.api_url + '/author/image/' + id, options);
  }
}
