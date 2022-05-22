import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { UsuarioService } from 'src/app/service/usuario.service';

declare let $: any;
declare var Swal: any;

@Component({
  selector: 'app-usuario-new-unrouted',
  templateUrl: './usuario-new-unrouted.component.html',
  styleUrls: ['./usuario-new-unrouted.component.scss']
})
export class UsuarioNewUnroutedComponent implements OnInit {

  strEntity: string = 'opinion';
  strOperation: string = 'new';
  strTitleSingular: string = 'Opinion';
  strTitlePlural: string = 'Opiniones';
  oUsuario2Send: IUsuario;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUsuario: IUsuario;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oOpinionService: UsuarioService,
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
      
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      nombre: [''],
      apellido1: [''],
      apellido2: [''],
      pais: [''],
      intereses: ['']  
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oUsuario2Send = {
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
      console.log(this.oUsuario2Send);
      
      this.new();      
    }
  }

  new = (): void => {
    this.oOpinionService
      .newOne(this.oUsuario2Send)
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

}
