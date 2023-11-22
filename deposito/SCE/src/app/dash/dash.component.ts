import { Component, NgZone, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  selector: 'dashboard',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  produto: any
  closed:any
  finished:any
  open:any
  // miniCardData = MINICARDDATA;

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 6 }
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 6 }
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    private router: Router,
    ) { }

  
    ngOnInit(): void {
      this.consultaQuantidadeProdutos()
      this.consultaPedidosConcluidos()
      this.consultaPedidosRejeitados()
      this.consultaPedidosAndamento()
    }

    consultaQuantidadeProdutos() {
      this.http.get("http://localhost:3000/inventory-products-amount", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.produto = response
      })
    }

    consultaPedidosConcluidos() {
      this.http.get("http://localhost:3000/orders-finished", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.finished = response
      })
    }

    consultaPedidosRejeitados() {
      this.http.get("http://localhost:3000/orders-closed", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.closed = response
      })
    }

    consultaPedidosAndamento() {
      this.http.get("http://localhost:3000/orders-open", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.open = response
      })
    }
}