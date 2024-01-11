import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: string[] = [];
  filteredItems: string[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchQuery$.subscribe(query => {
      this.handleSearch(query);
    });
  }

  handleSearch(query: string) {
    this.filteredItems = [];

    if (!query.trim()) {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}
