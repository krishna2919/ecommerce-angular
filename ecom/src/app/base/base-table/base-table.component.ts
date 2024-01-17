import {
  Component,
  Input,
  QueryList,
  ViewChildren,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/NgbdSortableHeader';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent {
  @Input() data: any[] = [];
  @Input() pageSize: number = 7;
  @Input() currentPage: number = 1;
  @Input() columns: string[] = [];
  @Input() sortedColumn: string = '';
  @Input() isAscending: boolean = true;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit() {}

  searchQuery: string = '';

  onSearch() {
    this.searchChange.emit(this.searchQuery);
  }
  getColumnValue(item: any, column: string): any {
    if (item.hasOwnProperty(column)) {
      return item[column];
    } else {
      console.warn(`Property '${column}' does not exist in the data item.`);
      return '';
    }
  }

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.isAscending = direction === 'asc';

    this.data.sort((a, b) => {
      const aValue = this.getColumnValue(a, column);
      const bValue = this.getColumnValue(b, column);

      if (aValue < bValue) {
        return this.isAscending ? -1 : 1;
      } else if (aValue > bValue) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
}
