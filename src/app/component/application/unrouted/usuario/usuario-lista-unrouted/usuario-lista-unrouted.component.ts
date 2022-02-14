import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPageUsuario, IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-lista-unrouted',
  templateUrl: './usuario-lista-unrouted.component.html',
  styleUrls: ['./usuario-lista-unrouted.component.scss']
})
export class UsuarioListaUnroutedComponent implements OnInit {

  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();

  strEntity: string = 'Usuario';
  strOperation: string = 'lista';
  strTitleSingular: string = 'Usuario';
  strTitlePlural: string = 'Usuarios';
  aUsuario: IUsuario[];
  nTotalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 5;
  id2ShowViewModal: number = 0;
  strUsuarioSession: string;
  strResult: string = null;
  strFilter: string = '';
  currentSortField: string = '';
  currentSortDirection: string = '';
  strFilteredMessage: string = '';
  subjectFiltro$ = new Subject();
  usuario: IUsuario;
  opcion: number;
  nombre: string;

  constructor(
    public dialogRef: MatDialogRef<UsuarioListaUnroutedComponent>,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oUsuarioService: UsuarioService,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    console.log(this.usuario);

    this.page = 1;
   }

  ngOnInit(): void {
    this.getPage();
  }

  getPage = () => {
    this.oUsuarioService
      .getPage(
        this.pageSize,
        this.page,
        this.strFilter,
        this.currentSortField,
        this.currentSortDirection
      )
      .subscribe((oPage: IPageUsuario) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado por ' + this.strFilter;
        } else {
          this.strFilteredMessage = 'Listado NO filtrado';
        }
        this.aUsuario = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.totalPages = oPage.totalPages;
        this.barraPaginacion = this.oPaginationService.pagination(
          this.totalPages,
          this.page
        );
        console.log(oPage);
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  };

  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
    this.getPage();
  }

  doFilter() {
    this.getPage();
  }

  doResetFilter() {
    this.strFilter = '';
    this.getPage();
  }

  doResetOrder() {
    this.currentSortField = '';
    this.currentSortDirection = '';
    this.getPage();
  }

  doSetOrder(order: string) {
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log('selection plist emite ' + id);
    this.selection.emit(id);
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    alert("You have logged out.");
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModalOption() {
    this.dialogRef.close({data: this.opcion, data2:this.nombre});
  }

  closeModal() {
    this.dialogRef.close();
  }

}
