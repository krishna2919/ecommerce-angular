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
import { status } from '../enums/enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  sortedColumn: string = 'order_id';
  isAscending: boolean = true;
  activeCustomer: any;
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
    this.getRegistrationTable();
  }

  loadData(): void {
    Promise.all([
      this.getActiveCustomer(),
      this.getBookingTable(),
      this.getRegistrationTable(),
      this.getGraphData(),
    ])
  }

  getActiveCustomer(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dashboardService.Count().subscribe((res: any) => {
        if (res && res.status === status.SUCCESS && res.data) {
          this.activeCustomer = res.data;
        }
        resolve();
      });
    });
  }

  getBookingTable(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dashboardService.listOfOrder().subscribe((res: any) => {
        if (res && res.status === status.SUCCESS) {
          this.listOfOrderTable = res.data;
          this.totalPages = Math.ceil(res.data.length / this.pageSize);
        }
        resolve();
      });
    });
  }

  getRegistrationTable(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dashboardService.recentlyRegistration().subscribe((res: any) => {
        if (res && res.status === status.SUCCESS) {
          this.listOfRegister = res.data;
          this.totalPages = Math.ceil(res.data.length / this.pageSize);
        }
        resolve();
      });
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

  getGraphData(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.dashboardService.graphOfCustomer().subscribe((res: any) => {
        if (res && res.status === status.SUCCESS) {
          this.graphData = res.data;
          this.renderGraphChart();
        }
        resolve();
      });
    });
  }
}
