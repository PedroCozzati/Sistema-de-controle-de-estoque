import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { ProductsComponent } from './products/products.component';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './card/card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AnnualSalesComponent } from './charts/annual-sales/annual-sales.component';
import { AnnualSales2Component } from './charts/annual-sales copy/annual-sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './_modal';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RootComponent } from './root/root.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ExpedicoesComponent } from './expedicoes/expedicoes.component';
import { EstoquesComponent } from './estoques/estoques.component';

@NgModule({
  declarations: [

    AppComponent,
    NavComponent,
    ProductsComponent,
    DashComponent,
    CardComponent,
    AnnualSalesComponent,
    AnnualSales2Component,
    LoginComponent,
    RootComponent,
    UsersComponent,
    ClientsComponent,
    OrdersComponent,
    FornecedoresComponent,
    ExpedicoesComponent,
    EstoquesComponent
  ],
  imports: [
    AppRoutingModule,
    ModalModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgApexchartsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent,AnnualSalesComponent]
})
export class AppModule { }
