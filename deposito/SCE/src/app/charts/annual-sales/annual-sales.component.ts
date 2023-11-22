import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from "@angular/common/http";
import { Component, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { ModalService } from "src/app/_modal/modal.service";


export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  dataLabels: any;
  grid: any;
  stroke: any;
  title: any;
};

@Component({
  selector: "annual-chart",
  templateUrl: "./annual-sales.component.html",
  styleUrls: ["./annual-sales.component.scss"]
})
export class AnnualSalesComponent {

  orderList: any
  pedidos: any

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.consultaPedidos()

  }

  consultaPedidos() {
    const value_list: any[]=[]
    const month_list: any[]=[]

    this.http.get("http://localhost:3000/orders-month", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.pedidos = response
        console.log(this.pedidos)

        this.pedidos.forEach((element: {
          value: any; month: any;
        }) => {
          value_list.push(element.value)
        });


        this.pedidos.forEach((element: {
          value: any; month: any;
        }) => {
          var m = element.month.split("_")[1]

          if(m=="1")
            element.month="Janeiro"
          if(m=="2")
            element.month="Fevereiro"
          if(m=="3")
            element.month="Março"
          if(m=="4")
            element.month="Abril"
          if(m=="5")
           element.month="Maio"
          if(m=="6")
            element.month="Junho"
          if(m=="7")
            element.month="Julho"
          if(m=="8")
            element.month="Agosto"
          if(m=="9")
            element.month="Setembro"
          if(m=="10")
            element.month="Outubro"
          if(m=="11")
            element.month="Novembro"
          if(m=="12")
            element.month="Dezembro"

          month_list.push(element.month)
        });


        this.chartOptions = {
          series: [
            {
              name: "",
              data: value_list
            }
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
          },
          title: {
            text: "Numero de pedidos por mês",
            align: "left"
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: month_list
          }
        };
      })
  }



  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    private router: Router,
  ) {


  }
}
