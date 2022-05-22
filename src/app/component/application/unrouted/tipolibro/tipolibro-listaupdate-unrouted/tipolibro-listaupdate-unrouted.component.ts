import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ILibro } from 'src/app/model/libro-interfaces';
import { IPageTipoLibro, ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { TipolibroService } from 'src/app/service/tipolibro.service';
import { TipolibroDeleteUnroutedComponent } from '../tipolibro-delete-unrouted/tipolibro-delete-unrouted.component';
import { TipolibroUpdateUnroutedComponent } from '../tipolibro-update-unrouted/tipolibro-update-unrouted.component';

@Component({
  selector: 'app-tipolibro-listaupdate-unrouted',
  templateUrl: './tipolibro-listaupdate-unrouted.component.html',
  styleUrls: ['./tipolibro-listaupdate-unrouted.component.scss']
})
export class TipolibroListaupdateUnroutedComponent implements OnInit {

  @Input() id_tipolibro: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "libro"
  strOperation: string = "plist"
  strTitleSingular: string = "Libro";
  strTitlePlural: string = "Libros";
  aLibros: ITipoLibro[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();
  barraPaginacion: string[];
  id: number;




  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oTipoLibroService: TipolibroService,   
    public matDialog: MatDialog,
    public oIconService: IconService
  ) {

    /*if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }*/
    this.id_tipolibro = this.oRoute.snapshot.params.id_tipolibro;
    if (this.id_tipolibro) {
      this.strFilteredMessage = "Listado filtrado por el tipo de producto " + this.id_tipolibro;
    } else {
      this.strFilteredMessage = "";
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
  }

  getPage = () => {
    console.log("buscando...", this.strFilter);
    this.oTipoLibroService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPageTipoLibro) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aLibros = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }



  jumpToPage = () => {
    this.getPage();
    return false;
  }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }

  openModalUpdate(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-update";
    dialogConfig.height = "375px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TipolibroUpdateUnroutedComponent, dialogConfig).afterClosed().subscribe(() => this.getPage());
  }

  openModalDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-delete";
    dialogConfig.height = "375px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TipolibroDeleteUnroutedComponent, dialogConfig).afterClosed().subscribe(() => this.getPage());
    this.reloadCurrentPage();
  }
  reloadCurrentPage() {
    window.location.reload();
   }
}
