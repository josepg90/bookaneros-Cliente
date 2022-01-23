import { LoginComponent } from './component/shared/routed/login/login.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { LibroViewComponent } from './component/application/routed/libro/view/libro-view.component';
import { LibroPlistComponent } from './component/application/routed/libro/plist/libro-plist.component';
import { NewComponent } from './component/application/routed/libro/new/new.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'logout', component: LogoutComponent},
  { path:'libro/:id', component: LibroViewComponent},
  { path:'libro', component: LibroPlistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
