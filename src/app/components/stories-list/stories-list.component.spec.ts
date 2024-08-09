import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesListComponent } from './stories-list.component';
import { LoadSpinnerComponent } from '../load-spinner/load-spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { StoryService } from '../../services/story.service';
import { of, throwError } from 'rxjs';
import { StoryResponseModel } from '../../models/story.response.model';
import { SimpleChange } from '@angular/core';

describe('StoriesListComponent', () => {
  let component: StoriesListComponent;
  let fixture: ComponentFixture<StoriesListComponent>;
  const mockStoryServcie = {
    getStories: () => {
      return of({ stories: [] } as StoryResponseModel);
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoriesListComponent,
        LoadSpinnerComponent,
        PaginationComponent,
      ],
      providers: [{ provide: StoryService, useValue: mockStoryServcie }],
    }).compileComponents();
    // mockStoryServcie = jasmine.createSpyObj('StoryService', ['getStories']);
    fixture = TestBed.createComponent(StoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should load stories when Story service return sucess', () => {
      mockStoryServcie.getStories = () => {
        return of({
          stories: [{ id: 1, title: 'Test', url: '' }],
        });
      };
      component.ngOnInit();
      expect(component.stories.length).toBeGreaterThan(0);
    });
    it('should show error message when Story service fails', () => {
      mockStoryServcie.getStories = () => {
        return throwError(() => new Error());
      };
      component.ngOnInit();
      expect(component.showErrorMessage).toBeTruthy();
    });
  });
  describe('ngOnChanges', () => {
    it('should call searchResults function when SimpleChange previous and current value is different', () => {
      const spyObject = spyOn(component, 'searchResults');
      const simpleChangeObj = new SimpleChange('previous', 'current', false);
      component.ngOnChanges({ searchText: simpleChangeObj });
      expect(spyObject).toHaveBeenCalled();
    });
    it('should not call searchResults function when SimpleChange previous and current value is same', () => {
      const spyObject = spyOn(component, 'searchResults');
      const simpleChangeObj = new SimpleChange('previous', 'previous', false);
      component.ngOnChanges({ searchText: simpleChangeObj });
      expect(spyObject).not.toHaveBeenCalled();
    });
  });
  describe('isNullorEmpty', () => {
    it('should return true when value is null', () => {
      expect(component.isNullorEmpty(null)).toBeTruthy();
    });
    it('should return true when value is empty', () => {
      expect(component.isNullorEmpty('')).toBeTruthy();
    });
    it('should return false when value is neither null or empty', () => {
      expect(component.isNullorEmpty('text')).toBeFalsy();
    });
  });
  describe('searchResults', () => {
    it('should not filter the stories when search text is empty', () => {
      component.stories = [
        { id: 1, title: 'Test', url: '//testurl' },
        { id: 1, title: 'Test Story Title', url: '//teststoryurl2' },
      ];
      component.searchResults('');
      expect(component.filteredStories.length).toBe(component.stories.length);
    });
    it('should filter the stories when search text is not empty', () => {
      component.stories = [
        { id: 1, title: 'Test', url: '//testurl' },
        { id: 1, title: 'Test Story Title', url: '//teststoryurl2' },
      ];
      component.searchResults('Story');
      expect(component.filteredStories.length).toBeLessThan(
        component.stories.length
      );
    });
  });
});
