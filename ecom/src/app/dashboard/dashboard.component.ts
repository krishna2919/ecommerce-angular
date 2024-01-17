import { Component } from '@angular/core';
import { DashboardService } from '../services/api/dashboard.service';
import {
  Chart,
  LineController,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  CategoryScale,
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sortedColumn: string = 'order_id';
  isAscending: boolean = true;
  activeCustomer: any;
  customer: any;
  category: any;
  product: any;
  withPrescriptionProduct: any;
  WithOutPrescriptionProduct: any;
  totalOrder: any;
  confirmedOrder: any;
  pendingOrder: any;
  totalSales: any;
  listOfOrderTable: any[] = [];
  listOfRegister: any[] = [];
  currentPage: number = 1;
  pageSize: number = 7;
  totalPages: number = 1;
  graphData: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadData();
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.getBookingTable();
    this.getREgistrationTable();
  }

  loadData(): void {
    this.getActiveCustomer();
    this.getCustomerCount();
    this.getCategoryCount();
    this.getConfirmedOrder();
    this.getPendingOrder();
    this.getTotalOrder();
    this.getTotalSales();
    this.getProductCount();
    this.getBookingTable();
    this.getREgistrationTable();
    this.getGraphData();
  }

  getActiveCustomer() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success' && res.data) {
        this.activeCustomer = res.data.ActiveCustomer.toString();
      }
    });
  }

  getCustomerCount() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.customer = res.data.Customer.toString();
      }
    });
  }

  getCategoryCount() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.category = res.data.Category.toString();
      }
    });
  }

  getProductCount() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.product = res.data.Product.toString();
      }
    });
  }

  getWithPrescription() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.withPrescriptionProduct = res.data.withPrescription.toString();
      }
    });
  }

  getProductWithOutPrescription() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.WithOutPrescriptionProduct =
          res.data.productWithOutPrescription.toString();
      }
    });
  }

  getTotalOrder() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.totalOrder = res.data.TotalOrder.toString();
      }
    });
  }

  getConfirmedOrder() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.confirmedOrder = res.data.ConfirmedOrder.toString();
      }
    });
  }

  getPendingOrder() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.pendingOrder = res.data.PendingOrder.toString();
      }
    });
  }

  getTotalSales() {
    this.dashboardService.Count().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.totalSales = res.data.TotalSales.toString();
      }
    });
  }

  getBookingTable() {
    this.dashboardService.listOfOrder().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.listOfOrderTable = res.data;
        this.totalPages = Math.ceil(res.data.length / this.pageSize);
      }
    });
  }

  getREgistrationTable() {
    this.dashboardService.recentlyRegistration().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.listOfRegister = res.data;
        this.totalPages = Math.ceil(res.data.length / this.pageSize);
      }
    });
  }

  ngAfterViewInit() {
    this.getGraphData();
  }

  renderGraphChart() {
    const ctx = document.getElementById('chart1') as HTMLCanvasElement;

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    Chart.register(
      LineController,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Legend,
      Tooltip,
      CategoryScale
    );

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.graphData.map((item) => `${item.month}/${item.Year}`),
        datasets: [
          {
            label: 'Customer Registrations',
            data: this.graphData.map((item) => item.count),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });
  }

  getGraphData() {
    this.dashboardService.graphOfCustomer().subscribe((res: any) => {
      if (res && res.status === 'success') {
        this.graphData = res.data;
        this.renderGraphChart();
      }
    });
  }
}
