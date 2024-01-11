import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-base-search',
  templateUrl: './base-search.component.html',
  styleUrls: ['./base-search.component.css']
})
export class BaseSearchComponent {
  searchQuery: string = '';

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchChange.emit(this.searchQuery);
  }
}
