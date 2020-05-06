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
  bardata: any;
  baroptions: any;
  themeSubscription: any;
  constructor(private theme: NbThemeService,private adminservice:AdminService) {
    this.adminservice.getIndividualsdata().subscribe(data =>{
      console.log(data);
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        var reply=Object.keys(data);
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
        var chartlabels=[];
        var chartdata=[];
        for(var i=0;i<reply.length;i++)
        {
          if(chartlabels.includes(data[i]["date_request"].substr(5,5)))
          {
            chartdata[i]+=data[i]["no_individuals"];
          }
          else
          {
            chartlabels.push(data[i]["date_request"].substr(5,5));
            chartdata[i]=0;
            chartdata[i]+=data[i]["no_individuals"];
          }
        }
        this.bardata = {
          labels: chartlabels,
          datasets: [{
            data: chartdata,
            label: 'Individuals Served',
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
        this.baroptions = {
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
