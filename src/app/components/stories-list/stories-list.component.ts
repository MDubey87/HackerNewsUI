import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StoryService } from '../../services/story.service';
import { StoryResponseModel } from '../../models/story.response.model';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrl: './stories-list.component.css',
})
export class StoriesListComponent implements OnInit, OnChanges {
  @Input() searchText = '';
  public stories: Story[] = [];
  public filteredStories: Story[] = [];
  public showSpinner = false;
  public showErrorMessage = false;
  pageOfItems: Array<any> = [];
  constructor(private _storyServcie: StoryService) {}

  ngOnInit(): void {
    this.loadStories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changePropery = changes['searchText'];
    if (changePropery.currentValue !== changePropery.previousValue) {
      this.searchResults(changePropery.currentValue);
    }
  }

  loadStories() {
    this.showSpinner = true;
    this._storyServcie.getStories().subscribe({
      next: (response: StoryResponseModel) => {
        this.stories = response.stories;
        this.searchResults('');
        this.showSpinner = false;
        this.showErrorMessage = false;
      },
      error: () => {
        this.showSpinner = false;
        this.showErrorMessage = true;
      },
    });
  }

  searchResults(searchText: string): void {
    if (!searchText) {
      this.filteredStories = this.stories;
      return;
    }

    this.filteredStories = this.stories.filter(
      (story) =>
        (!this.isNullorEmpty(story.title) &&
          story.title.toLowerCase().includes(searchText.toLowerCase())) ||
        (!this.isNullorEmpty(story.url) &&
          story.url.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

  isNullorEmpty = (input: string | null) => {
    return input === null || input === '';
  };

  onPageChange(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
