import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {path: '', component: DashComponent},
  {path: 'dashboard', component: DashComponent},
  {path: 'produtos', component: ProductsComponent},
  {path: 'usuarios', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClientsComponent},
  {path: 'pedidos', component: OrdersComponent},
  
  // { path: 'tabuleiro/novo', component: NovoTabuleiroComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
