import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path: '', component: DashComponent},
  {path: 'dashboard', component: DashComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  
  // { path: 'tabuleiro/novo', component: NovoTabuleiroComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
