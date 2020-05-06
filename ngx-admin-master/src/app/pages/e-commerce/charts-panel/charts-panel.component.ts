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

    this.adminservice.getcasestats().subscribe(res => {
      console.log('Response for case stats', res);
      this.casestat = res;
    },err => console.log('err',err));

    this.adminservice.getfoodstats().subscribe(res => {
      console.log('Response for food stats',res);
      this.foodstat = res;
    },err => console.log('Err',err));
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
