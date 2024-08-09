import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() serachEvent = new EventEmitter<string>();
  onSearchClick(searchText: string) {
    this.serachEvent.emit(searchText);
  }
}
