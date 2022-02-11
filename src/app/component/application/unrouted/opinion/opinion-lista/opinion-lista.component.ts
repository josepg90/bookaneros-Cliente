import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPagePost, IPost } from 'src/app/model/opinion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-opinion-lista',
  templateUrl: './opinion-lista.component.html',
  styleUrls: ['./opinion-lista.component.scss']
})
export class OpinionListaComponent implements OnInit {

  strEntity: string = "post"
  strOperation: string = "plist"
  strTitleSingular: string = "Post";
  strTitlePlural: string = "Posts";
  aPosts: IPost[];
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
    public oIconService: IconService
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

}
