import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ScannerComponent } from './scanner/scanner.component';
import { PedidoComponent } from './pedido/pedido.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

//----------------------
//PERFIL - secciones
//----------------------
import { PerfilComponent } from './perfil/perfil.component';
import { EsteticaComponent } from './perfil/estetica/estetica.component';
import { MenuComponent } from './perfil/menu/menu.component';
import { AltaPlatosComponent } from './perfil/menu/alta-platos/alta-platos.component';
import { ListaPlatosComponent } from './perfil/menu/lista-platos/lista-platos.component';
import { PromosComponent } from './perfil/promos/promos.component';
import { GeneralComponent } from './perfil/general/general.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'categoria', component: CategoriaComponent },
  { path:'scanner', component: ScannerComponent },
  { path:'pedido', component: PedidoComponent },
  { path:'login', component: LoginComponent },
  { path:'registro', component: RegistroComponent },
  { path:'perfil', component: PerfilComponent },
  { path:'estetica', component: EsteticaComponent },
  { path:'menu', component: MenuComponent },
  { path:'altaplatos', component: AltaPlatosComponent },
  { path:'listaplatos', component: ListaPlatosComponent },
  { path:'promos', component: PromosComponent },
  { path:'general', component: GeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
