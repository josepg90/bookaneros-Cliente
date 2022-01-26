import { LoginComponent } from './component/shared/routed/login/login.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { LibroViewComponent } from './component/application/routed/libro/view/libro-view.component';
import { LibroPlistComponent } from './component/application/routed/libro/plist/libro-plist.component';
import { NewComponent } from './component/application/routed/libro/new/new.component';
import { RegistroComponent } from './component/shared/routed/registro/registro.component';
import { SessionResolver } from './resolver/session-resolve';

const routes: Routes = [
  { path:'', component: HomeComponent, resolve: { message: SessionResolver }  },
  { path:'home', component: HomeComponent, resolve: { message: SessionResolver }  } ,
  { path:'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path:'logout', component: LogoutComponent, resolve: { message: SessionResolver } },
  { path:'registro', component: RegistroComponent, resolve: { message: SessionResolver } },
  { path:'libro/:id', component: LibroViewComponent, resolve: { message: SessionResolver } },
  { path:'libro', component: LibroPlistComponent, resolve: { message: SessionResolver } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
