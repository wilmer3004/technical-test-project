import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaInicioComponent } from './pagina-inicio/pagina-inicio.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { FormClientePostComponent } from './form-cliente-post/form-cliente-post.component';

const routes: Routes = [
  {path:'',component:PaginaInicioComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'formclient/:id',component:FormClienteComponent},
  {path:'formclient',component:FormClientePostComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
