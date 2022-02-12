import { IPageLibro } from '../../../../../model/libro-interfaces';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ILibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { LibroService } from 'src/app/service/libro.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { IconService } from 'src/app/service/icon.service';
import { TipolibroPlistUnroutedComponent } from '../../tipolibro/tipolibro-plist-unrouted/tipolibro-plist-unrouted.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-libro-card',
  templateUrl: './libro-card.component.html',
  styleUrls: ['./libro-card.component.scss']
})
export class LibroCardComponent implements OnInit {
  

  strEntity: string = "libro"
  strOperation: string = "plist"
  strTitleSingular: string = "Libro";
  strTitlePlural: string = "Libros";
  aLibros: ILibro[];
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
  randomLibros: ILibro[];
  oForm: FormGroup = null;
  genero: string;
  id_tipolibro: number;
  applyClass: string;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oLibroService: LibroService,
    public oIconService: IconService,
    public matDialog: MatDialog
  ) {

   
    

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
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);

      console.log(this.id_tipolibro);

      function shuffle(arr: any) {
        let currentIndex = arr.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex], arr[currentIndex]];
        }

        return arr;
    }

    shuffle(this.aLibros);

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


  openModal() {

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TipolibroPlistUnroutedComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(res => {
      console.log(res.data);
      console.log(res.data2);

      this.genero= res.data2;
      this.id_tipolibro= res.data;

      this.getPage();
      
    })
  }

}
