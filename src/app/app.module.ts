import { PaginationService } from './service/pagination.service';
import { IconService } from './service/icon.service';
import { FileService } from './service/file.service';
import { LibroService } from 'src/app/service/libro.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { HeaderComponent } from './component/shared/unrouted/header/header.component';
import { FooterComponent } from './component/shared/unrouted/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from './service/session.service';
import { SessionResolver } from './resolver/session-resolve';
import { LibroComponent } from './component/application/unrouted/libro/libro.component';
import { LibroViewComponent } from './component/application/routed/libro/view/libro-view.component';
import { NewComponent } from './component/application/routed/libro/new/new.component';
import { EditComponent } from './component/application/routed/libro/edit/edit.component';
import { RemoveComponent } from './component/application/routed/libro/remove/remove.component';
import { LibroPlistComponent } from './component/application/routed/libro/plist/libro-plist.component';
import { LibroListaComponent } from './component/application/unrouted/libro-lista/libro-lista.component';
import { RegistroComponent } from './component/shared/routed/registro/registro.component';
import { RegistroModalComponent } from './component/shared/unrouted/registro-modal/registro-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UsuarioViewComponent } from './component/application/routed/usuario/view/usuario-view.component';
import { UpdateComponent } from './component/application/routed/usuario/update/update.component';
import { UsuarioUpdateUnroutedComponent } from './component/application/unrouted/usuario/usuario-update-unrouted/usuario-update-unrouted.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LibroComponent,
    LibroViewComponent,
    NewComponent,
    EditComponent,
    RemoveComponent,
    LibroPlistComponent,
    LibroListaComponent,
    RegistroComponent,
    RegistroModalComponent,
    UsuarioViewComponent,
    UpdateComponent,
    UsuarioUpdateUnroutedComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    SessionService,
    SessionResolver,
    LibroService,
    FileService,
    IconService,
    PaginationService,
    { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
