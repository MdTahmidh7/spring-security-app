import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {
  @Input() chartTitle: string = 'Bar Chart';
  @Input() categories: string[] = [];
  @Input() data: number[] = [];

  chartOptions: any;
  isBrowser: boolean = false;
  ApexCharts: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit() {
    if (this.isBrowser) {
      const module = await import('ng-apexcharts');
      this.ApexCharts = module;
      this.initChart();
    }
  }

  initChart() {
    /*this.chartOptions = {
      series: [{ name: "Day Count", data: this.data }],
      chart: { type: "bar", height: 350 },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
      dataLabels: { enabled: false },
      xaxis: { categories: this.categories },
      title: { text: this.chartTitle },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
    };*/

    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: this.data
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.categories,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }
}
