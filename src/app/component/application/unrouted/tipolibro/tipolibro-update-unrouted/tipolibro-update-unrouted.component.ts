import { SessionService } from 'src/app/service/session.service';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { timeout } from 'rxjs/operators';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { TipolibroService } from 'src/app/service/tipolibro.service';

declare var Swal: any;

@Component({
  selector: 'app-tipolibro-update-unrouted',
  templateUrl: './tipolibro-update-unrouted.component.html',
  styleUrls: ['./tipolibro-update-unrouted.component.scss']
})
export class TipolibroUpdateUnroutedComponent implements OnInit {

  id: number = null;

  usuario: IUsuario;
  oForm: FormGroup;
  strEntity: string = 'tipolibro';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Tipo de Libro';
  strTitlePlural: string = 'Tipo de Libros';
  strUsuarioSession: string;

  oTipoLibro2Show: ITipoLibro;
  oTipoLibro2Send: ITipoLibro;
  
  strResult: string = null;
  oUsuarioSession: IUsuario;
  oUserSession: IUsuario;
  oTipoLibro: ITipoLibro;
  

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<TipolibroUpdateUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oTipoLibroService: TipolibroService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService,
    private oSessionService: SessionService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      //oRouter.navigate(['/home']);
    }
    this.id = data.id;
    //this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    console.log(this.id);

    //this.id = this.oActivatedRoute.snapshot.params.id; 
       
    this.getOne();
   }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      genero: ['']
      
    });
  }

  getOne = (): void => {
    this.oTipoLibroService
      .getOne(this.id)
      .subscribe((oData: ITipoLibro) => {
        this.oTipoLibro2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oTipoLibro2Show.id],
          genero: [
            this.oTipoLibro2Show.genero
          ]
      }); 
      console.log(this.oTipoLibro2Show);
    });  
  };

  onSubmit(): void {
    if (this.oForm) {
      this.oTipoLibro2Send = {
        id: this.oForm.value.id,
        genero: this.oForm.value.genero
      };

      this.update();
      
    }
  }

  update = (): void => {
    console.log(this.oTipoLibro2Send);
    this.oTipoLibroService
      .updateOne(this.oTipoLibro2Send)
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
          
      this.closeModal();
          Toast.fire({
            icon: 'success',
            title: 'Editado correctamente'
          })
         
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
      });
      setTimeout(() => {
        window.location.reload();
    }, 2500);
      
  };

  cerrar(): void {
    this.oRouter.navigate(['/dashboard']);
  }

  goBack(): void {
    this.oLocation.back();
  }

  reloadCurrentPage() {
    window.location.reload();
   }

// When the user clicks the action button a.k.a. the logout button in the\
// modal, show an alert and followed by the closing of the modal
actionFunction() {
  alert("You have logged out.");
  this.closeModal();
}

// If the user clicks the cancel button a.k.a. the go back button, then\
// just close the modal
closeModal() {
  this.dialogRef.close({ event: 'close', data: this.id });
}

}
