import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPagePost, IPost } from 'src/app/model/opinion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { OpinionDeleteUnroutedComponent } from '../opinion-delete-unrouted/opinion-delete-unrouted.component';
import { OpinionUpdateUnroutedComponent } from '../opinion-update-unrouted/opinion-update-unrouted.component';

@Component({
  selector: 'app-opinion-lista-admin',
  templateUrl: './opinion-lista-admin.component.html',
  styleUrls: ['./opinion-lista-admin.component.scss']
})
export class OpinionListaAdminComponent implements OnInit {

  strEntity: string = "post"
  strOperation: string = "plist"
  strTitleSingular: string = "Post";
  strTitlePlural: string = "Posts";
  aPosts: IPost[];
  id: number;
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 20;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();
  barraPaginacion: string[];

  genero: string;
  id_libro: number;
  id_usuario: number;
  applyClass: string;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oOpinionService: OpinionService,
    public oIconService: IconService,
    public matDialog: MatDialog
    ) { 
      if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }}

  ngOnInit(): void {
    this.getPage()
  }

  getPage = () => {
    
    console.log("buscando...", this.strFilter);

    this.oOpinionService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, this.id_libro, this.id_usuario).subscribe((oPage: IPagePost) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aPosts = oPage.content;
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);

      console.log(this.id_libro);

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

  openModalUpdate(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-update";
    dialogConfig.height = "700px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(OpinionUpdateUnroutedComponent, dialogConfig);
  }

  openModalDelete(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-delete";
    dialogConfig.height = "600px";
    dialogConfig.width = "1000px";
    dialogConfig.data = { id: this.id}
    console.log(this.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(OpinionDeleteUnroutedComponent, dialogConfig);
  }

}
