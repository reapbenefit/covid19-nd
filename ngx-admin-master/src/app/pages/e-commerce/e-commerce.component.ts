import { Component } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import {AdminService} from '../../service/admin.service'
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  data: any;
  options: any;
  linedata: any;
  lineoptions: any;
  themeSubscription: any;
  constructor(private theme: NbThemeService,private adminservice:AdminService) {

    this.adminservice.getcasestats().subscribe(data =>{
      console.log(data);

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        var casestats = Object.keys(data);

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        var xaxislabel = [];
        var yaxislabel = [];
        var yaxislabel1 = [];

        for(var i=0 ; i<casestats.length;i++)
        { 
          if(data[i]["assigned_timestamp"]){
            if(xaxislabel.includes(data[i]["assigned_timestamp"].substr(5,5)))
            {
              if(data[i]["closed_at"])
              {
                if(!xaxislabel.includes(data[i]["closed_at"].substr(5,5)))
                  xaxislabel.push(data[i]["closed_at"].substr(5,5));

                  ++yaxislabel[xaxislabel.indexOf([data[i]["closed_at"].substr(5,5)])];
              }
              else
                ++yaxislabel1[xaxislabel.indexOf([data[i]["assigned_timestamp"].substr(5,5)])];
            }
            else
            {
              xaxislabel.push(data[i]["assigned_timestamp"].substr(5,5));
              if(data[i]["closed_at"])
              {
                if(!xaxislabel.includes(data[i]["closed_at"].substr(5,5)))
                  xaxislabel.push(data[i]["closed_at"].substr(5,5));

                ++yaxislabel[xaxislabel.indexOf([data[i]["closed_at"].substr(5,5)])];
              }
              else
                ++yaxislabel1[xaxislabel.indexOf([data[i]["assigned_timestamp"].substr(5,5)])];
            }
         }
        }

        this.linedata = {
          labels: xaxislabel,
          datasets: [
            {
            data: yaxislabel,
            label: 'Completed',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            },
            {
            data:yaxislabel1,
            label: 'Pending',
            backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.8),
            }
          ]
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
