import { LoginComponent } from './component/shared/routed/login/login.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { LibroViewComponent } from './component/application/routed/libro/view/libro-view.component';
import { LibroPlistComponent } from './component/application/routed/libro/plist/libro-plist.component';
import { LibroNewComponent } from './component/application/routed/libro/new/libro-new.component';
import { RegistroComponent } from './component/shared/routed/registro/registro.component';
import { SessionResolver } from './resolver/session-resolve';
import { UsuarioViewComponent } from './component/application/routed/usuario/view/usuario-view.component';
import { DashboardComponent } from './component/application/routed/dashboard/dashboard.component';
import { PeticionesComponent } from './component/application/routed/peticiones/peticiones.component';
import { FavoritosComponent } from './component/application/routed/usuario/favoritos/favoritos.component';
import { NovedadComponent } from './component/application/routed/novedad/novedad.component';

const routes: Routes = [
  { path:'', component: HomeComponent, resolve: { message: SessionResolver }  },
  { path:'home', component: HomeComponent, resolve: { message: SessionResolver }  } ,
  { path:'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path:'logout', component: LogoutComponent, resolve: { message: SessionResolver } },
  { path:'registro', component: RegistroComponent, resolve: { message: SessionResolver } },
  { path:'libro/:id', component: LibroViewComponent, resolve: { message: SessionResolver } },
  { path:'libro', component: LibroPlistComponent, resolve: { message: SessionResolver } },
  { path:'usuario/:id', component: UsuarioViewComponent, resolve: { message: SessionResolver } },
  { path:'dashboard', component: DashboardComponent, resolve: { message: SessionResolver } },
  { path:'peticiones', component: PeticionesComponent, resolve: { message: SessionResolver } },
  { path:'favoritos', component: FavoritosComponent, resolve: { message: SessionResolver } },
  { path:'novedad', component: NovedadComponent, resolve: { message: SessionResolver } }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
