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

  dropdownItems: { icon: string, label: string }[] = [
    { icon: 'bx bx-user', label: 'Profile' },
    { icon: 'bx bx-cog', label: 'Settings' },
    { icon: 'bx bx-home-circle', label: 'Dashboard' },
    { icon: 'bx bx-dollar-circle', label: 'Earnings' },
    { icon: 'bx bx-download', label: 'Downloads' },
    { icon: 'bx bx-log-out-circle', label: 'Logout' }
  ];

  handleDropdownItemClick(itemLabel: string): void {
    console.log('Dropdown item clicked:', itemLabel);
  }
}
