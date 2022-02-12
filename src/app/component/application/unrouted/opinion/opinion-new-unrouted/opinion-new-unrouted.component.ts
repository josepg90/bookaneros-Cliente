import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPost2Send } from 'src/app/model/opinion-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';

declare let $: any;
declare var Swal: any;

@Component({
  selector: 'app-opinion-new-unrouted',
  templateUrl: './opinion-new-unrouted.component.html',
  styleUrls: ['./opinion-new-unrouted.component.scss']
})
export class OpinionNewUnroutedComponent implements OnInit {

  @Input() id_libro: number;
  strEntity: string = 'opinion';
  strOperation: string = 'new';
  strTitleSingular: string = 'Opinion';
  strTitlePlural: string = 'Opiniones';
  oPost2Send: IPost2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oPost: IPost;
  oUserSession: IUsuario;
  
  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oOpinionService: OpinionService,
    public oIconService: IconService,
    public matDialog: MatDialog
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
      cuerpo: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      libro: [''],
      usuario: ['']
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
      this.oPost2Send = {
        id: null,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
        libro: {
          id: this.id_libro,
        },
        usuario: {
          id: this.oUserSession.id,
        }
      };
      console.log(this.oPost2Send);
      
      this.new();
      this.recargar();      
    }
  }

  new = (): void => {
    this.oOpinionService
      .newOne(this.oPost2Send)
      .subscribe((oPost: IPost) => {
        if (oPost.id) {
          this.id = oPost.id;
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
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
       
      });
  };

  recargar() {
    
    setTimeout(() => {
       window.location.reload();
   }, 1000);
  }

  }


