import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { TipolibroService } from 'src/app/service/tipolibro.service';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { MatDialogRef } from '@angular/material/dialog';

declare var Swal: any;

@Component({
  selector: 'app-tipolibro-new-unrouted',
  templateUrl: './tipolibro-new-unrouted.component.html',
  styleUrls: ['./tipolibro-new-unrouted.component.scss']
})
export class TipolibroNewUnroutedComponent implements OnInit {

  strEntity: string = "tipolibro"
  strOperation: string = "new"
  strTitleSingular: string = "Género de libro";
  strTitlePlural: string = "Géneros de libro";
  oTipoProducto2Send: ITipoLibro = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<TipolibroNewUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oTipoLibroService: TipolibroService,
    private oLocation: Location,
    public oIconService: IconService
    ) {
      if (this.oRoute.snapshot.data.message) {
        this.oUserSession = this.oRoute.snapshot.data.message;
        localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
      } else {
        localStorage.clear();
        oRouter.navigate(['/home']);
      }
     }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      genero: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oTipoProducto2Send = {
        id: null,
        genero: this.oForm.value.genero,
      
      };
      this.new();
    }
  }

  new = (): void => {
    this.oTipoLibroService
      .newOne(this.oTipoProducto2Send)
      .subscribe((oTipoLibro: ITipoLibro) => {
        if (oTipoLibro.id) {
          this.id = oTipoLibro.id;
          const Toast = Swal.mixin({
            toast: true,
            position: 'middle',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
      
          Toast.fire({
            icon: 'success',
            title: 'Creado correctamente'
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

  goBack(): void {
    this.oLocation.back();
  }

  cerrar(): void {
    this.oRouter.navigate(['/login']);
  }

}
