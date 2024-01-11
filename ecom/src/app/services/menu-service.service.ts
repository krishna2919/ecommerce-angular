import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenuItems(): { icon: string; title: string }[] {
    return [
      { icon: 'bx bx-home-circle', title: 'Dashboard' },
      { icon: 'bx bx-category', title: 'Category' },
      { icon: 'bx bx-cart', title: 'Product' },
      { icon: 'bx bx-bar-chart-alt', title: 'Report' },
    ];
  }
}
