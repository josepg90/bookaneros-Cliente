import { IPeticion2Send } from './../../../../../model/peticiones-interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IPagePost, IPost } from 'src/app/model/opinion-interfaces';
import { IPagePeticion, IPeticion } from 'src/app/model/peticiones-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { PeticionesService } from 'src/app/service/peticiones.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFecha } from 'src/app/model/model-interfaces';

declare var Swal: any;

@Component({
  selector: 'app-peticiones-lista-unrouted',
  templateUrl: './peticiones-lista-unrouted.component.html',
  styleUrls: ['./peticiones-lista-unrouted.component.scss']
})
export class PeticionesListaUnroutedComponent implements OnInit {
  
  @Input() accion: number;
  strEntity: string = "peticiones"
  strOperation: string = "plist"
  strTitleSingular: string = "Peticion";
  strTitlePlural: string = "Peticiones";
  aPeticiones: IPeticion[];
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
  oPeticiones2Send: IPeticion2Send;
  oForm: FormGroup;
  enproceso_booleano: boolean;
  realizado_booleano: boolean;
  titulo: string; 
  peticion:string; 
  fecha: IFecha;
  usuario: IUsuario;

  login: string;
  id_libro: number;
  id_usuario: number;
  applyClass: string;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPeticionesService: PeticionesService,
    public oIconService: IconService,
    public matDialog: MatDialog,
    private oFormBuilder: FormBuilder,
    ) { 
      if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }}

  ngOnInit(): void {
    if(this.accion==0){
      this.getPeticiones();
    } else if (this.accion==1){
      this.getPeticionesEnProceso();
    } else if (this.accion==2){
      this.getPeticionesRealizadas();
    };

    this.oForm = this.oFormBuilder.group({
      titulo: [''],
      peticion: [''],
      fecha: [''],
      enproceso: [''],
      realizado: [''],
      usuario: ['']
      
    });
    
  }

  getPeticiones = () => {
    
    console.log("buscando...", this.strFilter);

    this.oPeticionesService.getPeticiones(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPagePeticion) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aPeticiones = oPage.content;
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);

    })
  }

  getPeticionesEnProceso = () => {
    
    console.log("buscando...", this.strFilter);

    this.oPeticionesService.getPeticionesEnProceso(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPagePeticion) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aPeticiones = oPage.content;
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);

    })
  }

  getPeticionesRealizadas = () => {
    
    console.log("buscando...", this.strFilter);

    this.oPeticionesService.getPeticionesRealizadas(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IPagePeticion) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aPeticiones = oPage.content;
      //this.randomLibros = _.shuffle(this.aLibros);
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);

    })
  }

  update = (id: number, titulo: string, peticion:string, fecha: IFecha, enproceso_booleano: boolean, realizado_booleano: boolean, usuario: IUsuario): void => {
    console.log(this.fecha);
   
    this.oPeticiones2Send = {
      id: this.id,
      titulo: this.titulo,
      peticion: this.peticion,
      fecha: this.fecha,
      enproceso: this.enproceso_booleano,
      realizado: this.realizado_booleano,
      usuario: {
        id: this.usuario.id
      }      
    };
    
    console.log(this.oPeticiones2Send);
    this.oPeticionesService
      .update(this.oPeticiones2Send)
      .subscribe((id: number) => {
        if (id) {
          this.id = id;
          const Toast = Swal.mixin({
            toast: true,
            position: 'middle',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
      
      setTimeout(() => {
        this.reloadCurrentPage(); 
     }, 2500);
          Toast.fire({
            icon: 'success',
            title: 'Editado correctamente'
          })
          
          this.cerrar();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
      });
      
  };

  jumpToPage = () => {
    this.getPeticiones();
    return false;
  }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
    this.getPeticiones();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPeticiones();
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
    this.getPeticiones();
  }

  cerrar(): void {
    this.oRouter.navigate(['/dashboard']);
  }
  reloadCurrentPage() {
    window.location.reload();
   }

  /*openModalUpdate(id: number) {
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

  openModalUsuario() {

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UsuarioListaUnroutedComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(res => {
      console.log(res.data);
      console.log(res.data2);

      this.login= res.data2;
      this.id_usuario= res.data;

      this.getPage();
      
    })
  }*/

}
