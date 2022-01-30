import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { LibroService } from 'src/app/service/libro.service';
import { Location } from '@angular/common';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { ILibro, ILibro2Send } from 'src/app/model/libro-interfaces';
import { MatDialogRef } from '@angular/material/dialog';

declare let $: any;
declare var Swal: any;

@Component({
  selector: 'app-libro-new-unrouted',
  templateUrl: './libro-new-unrouted.component.html',
  styleUrls: ['./libro-new-unrouted.component.scss']
})
export class LibroNewUnroutedComponent implements OnInit {
  strEntity: string = 'libro';
  strOperation: string = 'new';
  strTitleSingular: string = 'Libro';
  strTitlePlural: string = 'Libros';
  oLibro2Send: ILibro2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oTipoLibro: ITipoLibro;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<LibroNewUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oProductoService: LibroService,
    private oLocation: Location,
    public oIconService: IconService
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
      codigo: ['', [Validators.required]],
      titulo: ['', Validators.required],
      autor: [''],
      fecha_publicacion: [''],
      resumen: [''],
      imagen: [''],
      paginas: [''],
      novedad: [''],
      tipolibro: ['', Validators.required],
    });
    $('#fecha_publicacion').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha_publicacion'].setValue(dateText);
        this.oForm.controls['fecha_publicacion'].markAsDirty();
      }
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oLibro2Send = {
        id: null,
        codigo: this.oForm.value.codigo,
        titulo: this.oForm.value.titulo,
        autor: this.oForm.value.autor,
        fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
        resumen: this.oForm.value.resumen,
        imagen: this.oForm.value.imagen,
        paginas: this.oForm.value.paginas,
        novedad: this.oForm.value.novedad,
        tipolibro: {
          id: this.oForm.value.tipolibro,
        },
      };
      console.log(this.oLibro2Send);
      
      this.new();
    }
  }

  new = (): void => {
    this.oProductoService
      .newOne(this.oLibro2Send)
      .subscribe((oLibro: ILibro) => {
        console.log('dentro de new');
        if (oLibro.id) {
          this.id = oLibro.id;
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
    this.oRouter.navigate(['/dashboard']);
  }

}