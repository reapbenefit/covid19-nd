import { Component, OnInit, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { AdminService } from '../../../service/admin.service';
import { OrdersChartComponent } from './charts/case-chart.component';
import { ProfitChartComponent } from './charts/food-chart.component';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnInit {

  private alive = true;
  period: string = 'week';
  casestat: any;
  foodstat:any;

  constructor(private adminservice: AdminService) {}

  ngOnInit() {
    this.alive = false;

  }

  @ViewChild('CaseChart', {static: true}) caseChart: OrdersChartComponent;
  @ViewChild('FoodChart', {static: true}) foodChart: ProfitChartComponent;

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    // this.getCaseChartData(value);
    // this.getFoodChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.caseChart.resizeChart();
    } else {
      this.foodChart.resizeChart();
    }
  }

  
}
