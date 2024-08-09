import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryService } from './story.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { StoryResponseModel } from '../models/story.response.model';

describe('StoryService', () => {
  let service: StoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StoryService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return list of stories ', (done: DoneFn) => {
    const expectedStories: StoryResponseModel = {
      stories: [{ id: 1, title: 'Test', url: '' }],
    };

    httpClientSpy.get.and.returnValue(of(expectedStories));

    service.getStories().subscribe({
      next: (response: StoryResponseModel) => {
        expect(response).not.toBeNull();
        expect(response.stories.length).toBeGreaterThan(0);
        expect(response.stories[0].id).toBe(expectedStories.stories[0].id);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
  it('should return errors', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

    service.getStories().subscribe({
      next: () => {
        done();
      },
      error: (error: any) => {
        expect(error.status).toBe(errorResponse.status);
        done();
      },
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
