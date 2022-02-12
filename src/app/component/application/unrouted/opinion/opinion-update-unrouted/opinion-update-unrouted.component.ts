import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost, IPost2Send } from 'src/app/model/opinion-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { OpinionService } from 'src/app/service/opinion.service';

declare var Swal: any;
declare let $: any;

@Component({
  selector: 'app-opinion-update-unrouted',
  templateUrl: './opinion-update-unrouted.component.html',
  styleUrls: ['./opinion-update-unrouted.component.scss']
})
export class OpinionUpdateUnroutedComponent implements OnInit {

  id: number = null;
  oPost: IPost;
  oPost2Send: IPost2Send;
  oForm: FormGroup;
  
  get f() {
    return this.oForm.controls;
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<OpinionUpdateUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oOpinionService: OpinionService,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService
  ) {
    this.id = data.id;
    //this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    console.log(this.id);

    //this.id = this.oActivatedRoute.snapshot.params.id; 
       
    this.getOne();
   }

  ngOnInit(): void {

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

    this.oForm = this.oFormBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      cuerpo: ['', [Validators.required, Validators.minLength(5)]],
      fecha_publicacion: ['', [Validators.required, Validators.minLength(5)]],
      libro: ['', [Validators.required, Validators.minLength(5)]],
      usuario: ['', [Validators.required, Validators.minLength(5)]]
      
    });
  console.log(new Date().toLocaleString());

     
  }

  getOne = (): void => {
    this.oOpinionService
      .get(this.id)
      .subscribe((oData: IPost) => {
        this.oPost = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oPost.id],
          titulo: [
            this.oPost.titulo,
            [Validators.required, Validators.minLength(5)]
          ],
          cuerpo: [this.oPost.cuerpo, [Validators.required, Validators.minLength(5)]],
          fecha_publicacion: ['', [Validators.required, Validators.minLength(5)]],
          libro: [this.oPost.libro.id, [Validators.required, Validators.minLength(5)]],
          usuario: [this.oPost.usuario.id, [Validators.required, Validators.minLength(5)]]
        });
      });
           
  };

  onSubmit(): void {
    console.log(new Date().toLocaleString());
    if (this.oForm) {
      this.oPost2Send = {
        id: this.oForm.value.id,
        titulo: this.oForm.value.titulo,
        cuerpo: this.oForm.value.cuerpo,
        fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
        libro: {
          id: this.oForm.value.libro
        },
        usuario: {
          id: this.oForm.value.usuario
        }
      };
      console.log("Hola");
      
      console.log(this.oPost2Send.id);
      console.log(this.oPost2Send.libro);
      

      this.update();
    }
  }

  update = (): void => {
    
    this.oOpinionService
      .updateOne(this.oPost2Send)
      .subscribe((id: number) => {
        if (id) {
          this.id = id;
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
          
      this.closeModal();
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

 

  cerrar(): void {
    this.oRouter.navigate(['/dashboard']);
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
