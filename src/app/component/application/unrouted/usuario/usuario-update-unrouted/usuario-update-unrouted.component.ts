import { SessionService } from 'src/app/service/session.service';
import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IconService } from 'src/app/service/icon.service';
import { timeout } from 'rxjs/operators';

declare var Swal: any;

@Component({
  selector: 'app-usuario-update-unrouted',
  templateUrl: './usuario-update-unrouted.component.html',
  styleUrls: ['./usuario-update-unrouted.component.scss']
})
export class UsuarioUpdateUnroutedComponent implements OnInit {

  id: number = null;

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
  oUserSession: IUsuario;
  

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<UsuarioUpdateUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
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
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]]
      
    });
  }

  getOne = (): void => {
    this.oUsuarioService
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
      console.log(this.oUsuario2Show);
           
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
          
      this.closeModal();
          Toast.fire({
            icon: 'success',
            title: 'Editado correctamente'
          })
          this.loguearUpdate();
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
      });
      
  };

  loguearUpdate (){
    localStorage.clear();
    const loginData = { login: this.oForm.value.login, password: this.oForm.value.password};
    console.log("newLogin:onSubmit: ", loginData);
    this.oSessionService.login(JSON.stringify(loginData)).subscribe(data2 => {
      console.log(data2);
      
      localStorage.setItem("user", JSON.stringify(data2.toString()));
      if (data2 != null) {

        setTimeout(() => {
          window.location.reload();
      }, 2000);

        this.oRouter.navigate(['/usuario/' + this.id]);
        console.log(data2);
        
      } else {
        localStorage.clear();
      }
    });
    return false;
    console.log(localStorage);
    
    
  }

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
  this.dialogRef.close({ event: 'close', data: this.id });
}

}