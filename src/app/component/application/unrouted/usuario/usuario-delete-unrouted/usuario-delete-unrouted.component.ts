import { Component, Inject, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Location } from '@angular/common';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session.service';


declare var Swal: any;


@Component({
  selector: 'app-usuario-delete-unrouted',
  templateUrl: './usuario-delete-unrouted.component.html',
  styleUrls: ['./usuario-delete-unrouted.component.scss']
})
export class UsuarioDeleteUnroutedComponent implements OnInit {

  id: number = 0;
  oUsuario: IUsuario;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "usuario"
  strOperation: string = "remove"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";
  oForm: FormGroup;
  oUsuario2Show: IUsuario;
  public href: string = "";

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<UsuarioDeleteUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private _location: Location,
    public oIconService: IconService,
    private oSessionService: SessionService

  ) {
    // control de sesión
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.strUsuarioSession));
    } else {
      localStorage.clear();
      //oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    //this.id = this.oActivatedRoute.snapshot.params.id;
    // llamada al servidor
    this.id = data.id;
    this.getOne();    

   }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]]
      
    });

    this.href = this.oRouter.url;
    console.log(this.oRouter.url);
  }

  getOne = (): void => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario2Show = oData;
        console.log(oData);
        
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
    
    Swal.fire({
      title: '¿Estas seguro de eliminar tu usuario?',
      text: "¡No podras volver atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.removeOne();
        Swal.fire(
          'Eliminado!',
          'Tu usuario ha sido eliminado.',
          'success'
        )
      }            
      this.closeModal();      
    })

  }

  removeOne() {
    this.oUsuarioService.removeOne(this.id).subscribe((data: number) => {
      this.strResult = 'Usuario eliminado';
    });
  }

  public closeSession() {
    this.oSessionService.logout().subscribe(data2 => {
      localStorage.clear();
      this.oRouter.navigate(['/home']);
    });
  }

  goBack() {
    this._location.back();
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
