import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoryResponseModel } from '../models/story.response.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private _http: HttpClient) {}
  getStories(): Observable<StoryResponseModel> {
    const url = 'https://localhost:5000/api/top-new-stories';
    return this._http.get<StoryResponseModel>(url);
  }
}
