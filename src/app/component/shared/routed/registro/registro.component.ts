import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';
declare var Swal: any;


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: IUsuario = null;
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = '';
  idnuevo: number;
  strEntity: string = "usuario"
  strOperation: string = "new"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService
  ) {
    /*if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string =
        this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }*/
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]]

    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.usuario = {
        id: null,
        login: this.oForm.value.login,
        password: this.oForm.value.password,
        email: this.oForm.value.email,
      };
      console.log(this.usuario);
      
      this.new();
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
    this.oRouter.navigate(['login']);
  }

  goBack(): void {
    this.oLocation.back();
  }
   
}


