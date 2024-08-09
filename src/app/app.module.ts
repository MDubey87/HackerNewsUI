import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './components/search/search.component';
import { StoriesListComponent } from './components/stories-list/stories-list.component';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    StoriesListComponent,
    LoadSpinnerComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
