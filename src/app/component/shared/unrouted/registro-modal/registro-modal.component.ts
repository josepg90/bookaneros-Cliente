import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';


declare var Swal: any;

@Component({
  selector: 'app-registro-modal',
  templateUrl: './registro-modal.component.html',
  styleUrls: ['./registro-modal.component.scss']
})
export class RegistroModalComponent implements OnInit {

  usuario: IUsuario;
  oForm: FormGroup;
  id: number = 0;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    public dialogRef: MatDialogRef<RegistroModalComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService
  ) { }

   ngOnInit() {
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [ Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      pais: [''],
      intereses: ['']  
    });
    }

    onSubmit(): void {
      if (this.oForm) {
        this.usuario = {
          id: null,
          login: this.oForm.value.login,
          password: this.oForm.value.password,
          email: this.oForm.value.email,
          nombre: this.oForm.value.nombre,
          apellido1: this.oForm.value.apellido1,
          apellido2: this.oForm.value.apellido2,
          pais: this.oForm.value.pais,
          intereses: this.oForm.value.intereses
        };
        console.log(this.usuario);
        
        this.new();
        this.oRouter.navigate(['/login']);
        this.closeModal();
      }
    }
  
    new = (): void => {
      this.oUsuarioService
        .newOne(this.usuario)
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
