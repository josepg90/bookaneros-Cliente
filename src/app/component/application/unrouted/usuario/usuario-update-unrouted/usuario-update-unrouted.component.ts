import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IconService } from 'src/app/service/icon.service';

declare var Swal: any;


@Component({
  selector: 'app-usuario-update-unrouted',
  templateUrl: './usuario-update-unrouted.component.html',
  styleUrls: ['./usuario-update-unrouted.component.scss']
})
export class UsuarioUpdateUnroutedComponent implements OnInit {

  @Input()  id: number = null;

  usuario: IUsuario;
  oForm: FormGroup;
  strEntity: string = 'usuario';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Usuario';
  strTitlePlural: string = 'Usuarios';
  strUsuarioSession: string;

  oUsuario2Show: IUsuario;
  oUsuario2Send: IUsuario;
  
  strResult: string = null;
  oUsuarioSession: IUsuario;
  

  get f() {
    return this.oForm.controls;
  }

  constructor(
  public dialogRef: MatDialogRef<UsuarioUpdateUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    console.log(this.id);

    //this.id = this.oActivatedRoute.snapshot.params.id; 
    
    console.log(this.oUsuarioSession);
   
    this.getOne();
   }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]]
      
    });
  }

  getOne = (): void => {
    this.oUsuarioService
        //NO ME COJE EL ID (probar cambiando por un valor)
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oUsuario2Show.id],
          login: [
            this.oUsuario2Show.login,
            [Validators.required, Validators.minLength(5)]
          ],
          password: [this.oUsuario2Show.password, [Validators.required, Validators.minLength(5)]],
          email: [this.oUsuario2Show.email, [Validators.required, Validators.minLength(5)]]
        });
      });
      
  };

  onSubmit(): void {
    if (this.oForm) {
      this.oUsuario2Send = {
        id: this.oForm.value.id,
        login: this.oForm.value.login,
        password: this.oForm.value.password,
        email: this.oForm.value.email
      };

      this.update();
    }
  }

  update = (): void => {
    console.log(this.oUsuario2Send);
    this.oUsuarioService
      .updateOne(this.oUsuario2Send)
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
          
          Toast.fire({
            icon: 'success',
            title: 'Registrado correctamente'
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
    this.oRouter.navigate(['/login']);
  }

  goBack(): void {
    this.oLocation.back();
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
  this.dialogRef.close();
}

}
