import { Component, ContentChild, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ILibro, IPageLibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { LibroService } from 'src/app/service/libro.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { IconService } from 'src/app/service/icon.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss']
})
export class SugerenciasComponent implements OnInit {

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
  id_tipolibro1: number;
  id_tipolibro2: number;
  applyClass: string;
  id: number = null;
  oMedia: any;
  strUsuarioSession: string;
  listaIdLibros: number [] = [];
  aSugerencias: ILibro [] = [];
  indexList: number=0;
  comprobacion: number;

  get f() {
    return this.oForm.controls;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<SugerenciasComponent>,
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oLibroService: LibroService,
    public oIconService: IconService,
    public matDialog: MatDialog,
    private oSessionService: SessionService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
      console.log(this.oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      //oRouter.navigate(['/home']);
    }
    this.nPage = 1;
    this.id_tipolibro1 = data.id_tipolibro1;
    this.id_tipolibro2 = data.id_tipolibro2;
    this.listaIdLibros = data.listaIdLibroPasada;
    
   }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getSugerencias());
    this.getSugerencias();
  }

  getSugerencias = () => {
    
    console.log("buscando...", this.strFilter);

    this.oLibroService.getSugerencias(this.nPageSize, this.nPage, this.id_tipolibro1, this.strSortField, this.strSortDirection, this.id_tipolibro2).subscribe((oPage: IPageLibro) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.id_tipolibro1 + " " + this.id_tipolibro2;
      } else {
        this.strFilteredMessage = "";
      }
      this.aLibros = oPage.content;
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
      console.log(this.aLibros);
      console.log(this.id_tipolibro1 +" "+ this.id_tipolibro2);

      for (let clave of this.aLibros){
        //A??adimos el ID del libro al Array para comporbar en el modal que no lo tenemos ya en favoritos
        this.comprobacion=this.aLibros[this.indexList].id;
        if (!this.listaIdLibros.includes(this.comprobacion)) {    
          this.aSugerencias.push(this.aLibros[this.indexList]);
        }
        this.indexList++;
      }
      console.log(this.aSugerencias);

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

    shuffle(this.aSugerencias);

    })
  }

  getValoracion = () => {
    this.oLibroService
      .getValoracion(this.id)
      .subscribe((oMedia: any) => {
        this.oMedia = oMedia;
        console.log(oMedia);
        if (this.oMedia == null){
          this.oMedia = "Sin valorar";
        }

      });
  };

  jumpToPage = () => {
    this.getSugerencias();
    return false;
  }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getSugerencias();
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
    this.getSugerencias();
  }

  closeModal() {
    this.dialogRef.close({ event: 'close'});
  }
}
