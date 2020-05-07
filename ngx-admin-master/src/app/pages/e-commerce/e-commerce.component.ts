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
  themeSubscription: any;
  bardata: any;
  baroptions: any;
  themeSubscription1: any;

  constructor(private theme: NbThemeService,private adminservice:AdminService) {

    this.adminservice.getcasestats().subscribe(data =>{

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        this.casestats = data;

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        var xaxislabel = [];
        var yaxislabel = [0,0,0,0,0];
        var yaxislabel1 = [0,0,0,0,0,0];

       this.casestats.forEach(ele => {
        //  console.log('element',ele)
       if(ele){
        if(ele["assigned_timestamp"]){
          if(xaxislabel.includes(ele["assigned_timestamp"].substr(5,5)))
          {
            if(ele["closed_at"])
            {
              const ss = xaxislabel.indexOf(ele["closed_at"].substr(5,5));
              if(!xaxislabel.includes(ele["closed_at"].substr(5,5)))
                xaxislabel.push(ele["closed_at"].substr(5,5));

              yaxislabel[ss] += 1;
              // console.log('ss1',ss)
            }
            else{
              const ss = xaxislabel.indexOf(ele["assigned_timestamp"].substr(5,5));
              yaxislabel1[ss] += 1;
              // console.log('ss2',ss)
            }
          }
          else
          {
            xaxislabel.push(ele["assigned_timestamp"].substr(5,5));
            if(ele["closed_at"])
            {
              const ss = xaxislabel.indexOf(ele["closed_at"].substr(5,5));
              if(!xaxislabel.includes(ele["closed_at"].substr(5,5)))
                xaxislabel.push(ele["closed_at"].substr(5,5));

              yaxislabel[ss] += 1;
              // console.log('ss3',ss)
            }
            else{
              const ss = xaxislabel.indexOf(ele["assigned_timestamp"].substr(5,5));
              yaxislabel1[ss] += 1;
              // console.log('ss4',ss)
            }
          }
       }}
       });

       console.log('yaxislabel',yaxislabel)
       console.log('yaxislabel1',yaxislabel1)


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
        
        this.lineoptions = {
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
        } 
    }
  )});

  this.adminservice.getIndividualsdata().subscribe(data =>{
    console.log(data);
    this.themeSubscription1 = this.theme.getJsTheme().subscribe(config => {
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
