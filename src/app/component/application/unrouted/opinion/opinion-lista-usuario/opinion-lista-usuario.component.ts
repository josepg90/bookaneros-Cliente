import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { IPagePost, IPost } from 'src/app/model/opinion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { TipolibroPlistUnroutedComponent } from '../../tipolibro/tipolibro-plist-unrouted/tipolibro-plist-unrouted.component';

@Component({
  selector: 'app-opinion-lista-usuario',
  templateUrl: './opinion-lista-usuario.component.html',
  styleUrls: ['./opinion-lista-usuario.component.scss']
})
export class OpinionListaUsuarioComponent implements OnInit {

  @Input() id_libro: number;
  oPost: IPost;
  strEntity: string = "post"
  strOperation: string = "plist"
  strTitleSingular: string = "Post";
  strTitlePlural: string = "Títulos";
  aPosts: IPost[];
  id: number;
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
  login: string;
  genero: string;
  id_usuario: number;
  applyClass: string;
  id_tipolibro: number;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oOpinionService: OpinionService,
    public oIconService: IconService,
    public matDialog: MatDialog
  ) { 
    if (this.oRoute.snapshot.data['message']) {
      this.oUserSession = this.oRoute.snapshot.data['message'];
      console.log(this.oUserSession.id);

      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
    }
  }

  ngOnInit(): void {

    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
    setTimeout(() => {
      this.getPage();
   }, 100);
    
  }

  getPage = () => {
    
    console.log("buscando...", this.strFilter);
    console.log(this.strFilter);
    this.oOpinionService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, this.id_libro, this.oUserSession.id).subscribe((oPage: IPagePost) => {
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

      console.log(this.strFilter);

      console.log(this.aPosts);
      

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

}
