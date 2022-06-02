import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFavoritoValoracion, IFavoritoValoracion2Send } from 'src/app/model/favoritovaloracion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FavoritoValoracionService } from 'src/app/service/favoritovaloracion.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-favoritos-state-unrouted',
  templateUrl: './favoritos-state-unrouted.component.html',
  styleUrls: ['./favoritos-state-unrouted.component.scss']
})
export class FavoritosStateUnroutedComponent implements OnInit {

  @Input() id :number;
  oFavorito:any;
  oUserSession: IUsuario;
  bFavorito: any;
  vColor: string;
  comprobacion: any;
  oForm: FormGroup = null;
  oFavoritoValoracion2Show: IFavoritoValoracion;
  oFavoritoValoracion2Send: IFavoritoValoracion2Send;
  strResult: string = null;
  cambioFavorito: boolean;
  
  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oLibroService: LibroService,
    private oFavoritoValoracionService: FavoritoValoracionService,
    private oRouter: Router
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
       localStorage.setItem('user', JSON.stringify(this.oUserSession));
     } else {
       localStorage.clear();
       oRouter.navigate(['/home']);
     }
   }

  ngOnInit(): void {
    this.esFavorito();
    this.oForm = this.oFormBuilder.group({
      favorito: [''],
      valoracion: [''],
      libro: [''],
      usuario: ['']
    });
  }

  esFavorito(): void {
    console.log(this.oUserSession.id);
    console.log(this.id);
    this.oFavoritoValoracionService
      .getFavoritoUsuario(this.oUserSession.id, this.id)
      .subscribe((bFavorito: any) => {
        this.bFavorito = bFavorito;
        console.log(this.bFavorito);
      });
}

newOrEdit(): void {
    
  this.oFavoritoValoracionService
    .getValoracionUsuario(this.oUserSession.id, this.id)
    .subscribe((comprobacion: any) => {
      this.comprobacion = comprobacion;
      console.log(this.comprobacion);
      console.log(this.oUserSession.id);
      console.log(this.id);
      if (this.comprobacion == null){
        this.onSubmitNew();
      } else {
        console.log("Se puede hacer Edit");
        this.getOne();
        //this.onSubmit2();
      }
    });
}

onSubmitNew(): void {
  if (this.oForm) {
    this.oFavoritoValoracion2Send = {
      id: null,
      favorito: true,
      valoracion: null,
      libro: {
        id: this.id,
      },
      usuario: {
        id: this.oUserSession.id,
      }
    };
    this.new();
    this.recargar();
  }
}

new = (): void => {
  this.oFavoritoValoracionService
    .newOne(this.oFavoritoValoracion2Send)
    .subscribe((oFavoritoValoracion: IFavoritoValoracion) => {
      console.log('dentro de new');
      if (oFavoritoValoracion.id) {
        this.id = oFavoritoValoracion.id;
        console.log('Creado Favorito correctamente');
        this.strResult = 'Creado Favorito correctamente';
      } else {
        this.strResult = 'Error en la creación del Favorito';
      }
     
    });
};

onSubmitUpdate(): void {
  if (this.oForm) {
    if(this.oFavoritoValoracion2Show.favorito){
      this.cambioFavorito=false;
    } else{
      this.cambioFavorito=true;
    }
    console.log(this.cambioFavorito);
    this.oFavoritoValoracion2Send = {
      id: this.oFavoritoValoracion2Show.id,
      favorito: this.cambioFavorito,
      valoracion: this.oFavoritoValoracion2Show.valoracion,
      libro: {
        id: this.oFavoritoValoracion2Show.libro.id,
      },
      usuario: {
        id: this.oFavoritoValoracion2Show.usuario.id,
      }
    };
    console.log(this.oFavoritoValoracion2Send);
    this.update();
    this.recargar();
  }
}

update = (): void => {
  
  this.oFavoritoValoracionService
    .update(this.oFavoritoValoracion2Send)
    .subscribe((comprobacion: number) => {
      if (comprobacion) {
        this.id = comprobacion;
        console.log('Actualizada Valoración correctamente');
        this.strResult = 'Actualizada Valoración correctamente';
      } else {
        this.strResult = 'Error en la actualización de la Valoración';
      }
    }); 
};

getOne = (): void => {
  this.oFavoritoValoracionService
    .get(this.comprobacion)
    .subscribe((oData: IFavoritoValoracion) => {
      
      this.oFavoritoValoracion2Show = oData;
      console.log(this.oFavoritoValoracion2Show);
      this.onSubmitUpdate();
    }); 
             
};

recargar() {
    
  setTimeout(() => {
     window.location.reload();
 }, 1000);
 this.esFavorito();
}
  
}
