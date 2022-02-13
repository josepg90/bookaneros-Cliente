import { OpinionService } from './service/opinion.service';
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
import { LibroCarouselComponent } from './component/application/unrouted/libro/libro-carousel/libro-carousel.component';
import { LibroViewComponent } from './component/application/routed/libro/view/libro-view.component';
import { LibroNewComponent } from './component/application/routed/libro/new/libro-new.component';
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
import { UsuarioDeleteUnroutedComponent } from './component/application/unrouted/usuario/usuario-delete-unrouted/usuario-delete-unrouted.component';
import { DashboardComponent } from './component/application/routed/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { LibroNewUnroutedComponent } from './component/application/unrouted/libro/libro-new-unrouted/libro-new-unrouted.component';
import { TipolibroNewUnroutedComponent } from './component/application/unrouted/tipolibro/tipolibro-new-unrouted/tipolibro-new-unrouted.component';
import { PeticionesComponent } from './component/application/routed/peticiones/peticiones.component';
import { TipolibroPlistUnroutedComponent } from './component/application/unrouted/tipolibro/tipolibro-plist-unrouted/tipolibro-plist-unrouted.component';
import { LibroCardComponent } from './component/application/unrouted/libro/libro-card/libro-card.component';
import { StarRateComponent } from './component/shared/unrouted/star-rate/star-rate.component';
import { OpinionListaUsuarioComponent } from './component/application/unrouted/opinion/opinion-lista-usuario/opinion-lista-usuario.component';
import { OpinionListaAdminComponent } from './component/application/unrouted/opinion/opinion-lista-admin/opinion-lista-admin.component';
import { OpinionUpdateUnroutedComponent } from './component/application/unrouted/opinion/opinion-update-unrouted/opinion-update-unrouted.component';
import { OpinionDeleteUnroutedComponent } from './component/application/unrouted/opinion/opinion-delete-unrouted/opinion-delete-unrouted.component';
import { OpinionNewUnroutedComponent } from './component/application/unrouted/opinion/opinion-new-unrouted/opinion-new-unrouted.component';
import { UsuarioNewUnroutedComponent } from './component/application/unrouted/usuario/usuario-new-unrouted/usuario-new-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LibroCarouselComponent,
    LibroViewComponent,
    LibroNewComponent,
    EditComponent,
    RemoveComponent,
    LibroPlistComponent,
    LibroListaComponent,
    RegistroComponent,
    RegistroModalComponent,
    UsuarioViewComponent,
    UpdateComponent,
    UsuarioUpdateUnroutedComponent,
    UsuarioDeleteUnroutedComponent,
    DashboardComponent,
    LibroNewUnroutedComponent,
    TipolibroNewUnroutedComponent,
    PeticionesComponent,
    TipolibroPlistUnroutedComponent,
    LibroCardComponent,
    StarRateComponent,
    OpinionListaUsuarioComponent,
    OpinionListaAdminComponent,
    OpinionUpdateUnroutedComponent,
    OpinionDeleteUnroutedComponent,
    OpinionNewUnroutedComponent,
    UsuarioNewUnroutedComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    SessionService,
    SessionResolver,
    LibroService,
    FileService,
    IconService,
    PaginationService,
    OpinionService,
    { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
