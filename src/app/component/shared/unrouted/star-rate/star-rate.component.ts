import { IFavoritoValoracion } from './../../../../model/favoritovaloracion-interfaces';
import { FavoritoValoracionService } from './../../../../service/favoritovaloracion.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFavoritoValoracion2Send } from 'src/app/model/favoritovaloracion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss']
})
export class StarRateComponent implements OnInit {
  @Input() id_libro: number;
  oUserSession: IUsuario;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  oForm: FormGroup = null;
  oFavoritoValoracion2Send: IFavoritoValoracion2Send;
  strResult: string = null;
  id: number = null;
  comprobacion: any;
  oFavoritoValoracion2Show: IFavoritoValoracion;

  get f() {
    return this.oForm.controls;
  }
  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
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
    this.oForm = this.oFormBuilder.group({
      favorito: [''],
      valoracion: [''],
      libro: [''],
      usuario: ['']
    });
  }

  countStar(star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
    console.log('Value of star', this.selectedValue);
  }


  newOrEdit(): void {
    
    this.oFavoritoValoracionService
      .getValoracionUsuario(this.oUserSession.id, this.id_libro)
      .subscribe((comprobacion: any) => {
        this.comprobacion = comprobacion;
        console.log(comprobacion);
        if (this.comprobacion == null){
          this.onSubmit();
        } else {
          console.log("Se puede hacer Edit");
          this.getOne();
          //this.onSubmit2();

        }

      });
  

}
  onSubmit(): void {
    if (this.oForm) {
      this.oFavoritoValoracion2Send = {
        id: null,
        favorito: false,
        valoracion: this.selectedValue,
        libro: {
          id: this.id_libro,
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
          console.log('Actualizada Valoración correctamente');
          this.strResult = 'Actualizada Valoración correctamente';
        } else {
          this.strResult = 'Error en la actualización de la Valoración';
        }
       
      });
  };

  onSubmit2(): void {
    if (this.oForm) {
      this.oFavoritoValoracion2Send = {
        id: this.oFavoritoValoracion2Show.id,
        favorito: this.oFavoritoValoracion2Show.favorito,
        valoracion: this.selectedValue,
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
        this.onSubmit2();
      }); 
       
      
      
           
  };

  recargar() {
    
    setTimeout(() => {
       window.location.reload();
   }, 1000);
  }
}
