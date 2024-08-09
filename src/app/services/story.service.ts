import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoryResponseModel } from '../models/story.response.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) {}
  getStories(): Observable<StoryResponseModel> {
    const url = `${this.baseUrl}/top-new-stories`;
    return this._http.get<StoryResponseModel>(url);
  }
}
