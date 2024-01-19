import { Component, Input, QueryList, ViewChildren, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/NgbdSortableHeader';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.css'],
})
export class BaseTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() pageSize: number = 7;
  @Input() currentPage: number = 1;
  @Input() columns: string[] = [];
  @Input() sortedColumn: string = '';
  @Input() isAscending: boolean = true;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  dataSource: MatTableDataSource<any>;
  private searchSubject = new Subject<string>();

  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.filter = '';
    }
  }
  

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.dataSource.filter = value.trim().toLowerCase();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(filterValue);
    
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
      const firstValue = this.getColumnValue(a, column);
      const secondValue = this.getColumnValue(b, column);

      if (firstValue < secondValue) {
        return this.isAscending ? -1 : 1;
      } else if (firstValue > secondValue) {
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
