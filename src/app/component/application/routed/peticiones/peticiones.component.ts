import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPeticion, IPeticion2Send } from 'src/app/model/peticiones-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PeticionesService } from 'src/app/service/peticiones.service';

declare let $: any;
declare var Swal: any;
@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  strEntity: string = 'opinion';
  strOperation: string = 'new';
  strTitleSingular: string = 'Opinion';
  strTitlePlural: string = 'Opiniones';
  oPeticion2Send: IPeticion2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oPeticion: IPeticion;
  oUserSession: IUsuario;
  
  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oOpinionService: PeticionesService,
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
      
      titulo: ['', Validators.required],
      peticion: ['', Validators.required],
      fecha: ['', Validators.required],
      enproceso: [''],
      realizado: [''],
      usuario: ['']
    });
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oPeticion2Send = {
        id: null,
        titulo: this.oForm.value.titulo,
        peticion: this.oForm.value.peticion,
        fecha: this.oForm.value.fecha.replace("-", "/").replace("-", "/"),
        enproceso: false,
        realizado: false,
        usuario: {
          id: this.oUserSession.id,
        }
      };
      console.log(this.oPeticion2Send);
            
      this.new();      
    }
  }

  new = (): void => {
    this.oOpinionService
      .newOne(this.oPeticion2Send)
      .subscribe((oPost: IPeticion) => {
        if (oPost.id) {
          this.id = oPost.id;
          const Toast = Swal.mixin({
            toast: true,
            position: 'middle',
            showConfirmButton: false,
            timer: 2000,
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
          setTimeout(() => {
            window.location.reload();
        }, 2000);
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
       
      });
  };


}
