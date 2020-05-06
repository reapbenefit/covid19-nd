import { Component } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {AdminService} from '../../service/admin.service'
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  data: any;
  options: any;
  casestats: any;
  linedata: any;
  lineoptions: any;
  xaxislabel = [];
  yaxislabel = [];
  yaxislabel1 = [];
  themeSubscription: any;
  constructor(private theme: NbThemeService,private adminservice:AdminService) {
    this.adminservice.getcasestats().subscribe(data =>{
      console.log(data);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        this.casestats = Object.keys(data);

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        for(var i=0;i<this.casestats.length;i++)
        { 
          if(data[i]["assigned_timestamp"]){
          if(this.xaxislabel.includes(data[i]["assigned_timestamp"].substr(5,5)))
          {
            if(data[i]["closed_at"] == null)
             this.yaxislabel[i]++;
            else
             this.yaxislabel1[i]++;
          }
          else
          {
            this.xaxislabel.push(data[i]["assigned_timestamp"].substr(5,5));
            this.yaxislabel[i]=0;
            this.yaxislabel1[i]=0;
            if(data[i]["closed_at"] == null)
             this.yaxislabel[i]++;
            else
             this.yaxislabel1[i]++;
          }
         }
        }
        this.linedata = {
          labels: this.xaxislabel,
          datasets: [
            {
            data: this.yaxislabel1,
            label: 'Completed',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            },
            {
              data: this.yaxislabel,
            label: 'Pending',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            }]
        };

        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
        this.lineoptions = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
    });
  }
}
