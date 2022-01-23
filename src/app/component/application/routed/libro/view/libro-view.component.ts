import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { LibroService } from 'src/app/service/libro.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-libro-view',
  templateUrl: './libro-view.component.html',
  styleUrls: ['./libro-view.component.scss']
})
export class LibroViewComponent implements OnInit {

  strEntity: string = "producto"
  strOperation: string = "view"
  strTitleSingular: string = "Producto";
  strTitlePlural: string = "Productos";
  id: number = null;
  strUsuarioSession: string;
  strResult: string = null;
  oLibro: ILibro;
  oUserSession: IUsuario;

  constructor(
    private oLibroService: LibroService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location
  ) { 
    //HASTA QUE NO FUNCIONE EL LOGUEO NO PUEDO PONERLO
    /*if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);

    }*/

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();
  }

  ngOnInit(): void {
  }

  getOne = () => {
    this.oLibroService
      .get(this.id)
      .subscribe((oData: ILibro) => {
        this.oLibro = oData;
        console.log(this.oLibro);
      });
  };

  goBack() {
    this.oLocation.back();
  }

}
