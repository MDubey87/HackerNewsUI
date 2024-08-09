import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PaginationHelper } from './pagination.helper';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() itemList!: Array<any>;
  @Output() changePageEvent = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;
  pager: any = {};
  ngOnInit() {
    // set page if items array isn't empty
    if (this.itemList && this.itemList.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (
      changes['itemList'].currentValue !== changes['itemList'].previousValue
    ) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = PaginationHelper.paginate(
      this.itemList.length,
      page,
      this.pageSize,
      this.maxPages
    );
    var pageOfItems = this.itemList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.changePageEvent.emit(pageOfItems);
  }
}
