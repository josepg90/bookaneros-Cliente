import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ILibro, IPageLibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { LibroService } from 'src/app/service/libro.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { LibroDeleteUnroutedComponent } from '../libro/libro-delete-unrouted/libro-delete-unrouted.component';
import { LibroUpdateUnroutedComponent } from '../libro/libro-update-unrouted/libro-update-unrouted.component';

@Component({
  selector: 'app-libro-lista',
  templateUrl: './libro-lista.component.html',
  styleUrls: ['./libro-lista.component.scss']
})
export class LibroListaComponent implements OnInit {
  @Input() id_tipolibro: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "libro"
  strOperation: string = "plist"
  strTitleSingular: string = "Libro";
  strTitlePlural: string = "Libros";
  aLibros: ILibro[];
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
    private oLibroService: LibroService,
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
      this.strFilteredMessage = "Listado filtrado por el tipo de libro " + this.id_tipolibro;
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
    this.oLibroService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, this.id_tipolibro).subscribe((oPage: IPageLibro) => {
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
    dialogConfig.height = "900px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LibroUpdateUnroutedComponent, dialogConfig).afterClosed().subscribe(() => this.getPage());
  }

  openModalDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-delete";
    dialogConfig.height = "650px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(LibroDeleteUnroutedComponent, dialogConfig).afterClosed().subscribe(() => this.getPage());
  }
  reloadCurrentPage() {
    window.location.reload();
   }
}
