import { UsuarioService } from './../../../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { CryptoService } from 'src/app/service/crypto.service';
import { SessionService } from 'src/app/service/session.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistroModalComponent } from '../../unrouted/registro-modal/registro-modal.component';
import { IconService } from 'src/app/service/icon.service';

declare var Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  strOperation: string = "login"
  formularioLogin: FormGroup;
  oUserSession: IUsuario;
  usuario: IUsuario;
  oForm: FormGroup;
  strUrl: String = "";

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private FormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService,
    private oUsuarioService: UsuarioService,
    private oCryptoService: CryptoService,
    public oIconService: IconService,
    public matDialog: MatDialog
  ) {
    if (oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(oRoute.snapshot.data.message));
      oRouter.navigate(['/home']);
    } else {
      localStorage.clear();
    }

    this.formularioLogin = <FormGroup>this.FormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const loginData = { login: this.formularioLogin.get('login')!.value, password: this.formularioLogin.get('password')!.value };
    console.log("login:onSubmit: ", loginData);
    this.oSessionService.login(JSON.stringify(loginData)).subscribe(data => {
      localStorage.setItem("user", JSON.stringify(data.toString()));
      if (data != null) {
        this.oRouter.navigate(['/home']);
      } else {
        localStorage.clear();
      }
    });
    return false;
  }

  loginUser() {
    this.formularioLogin.setValue({
      login: "josedaw",
      password: "josedaw"
    })
  }

  loginAdmin() {
    this.formularioLogin.setValue({
      login: "admin",
      password: "admin"
    })
  }
  
  new = (): void => {
    this.oUsuarioService
      .newOne(this.usuario)
      .subscribe((id: number) => {
        
      });
  };

  registro() {
    const { value: formValues } = Swal.fire({
      title: 'Multiple inputs',
      html:
      '<h5>Nombre de usuario<\h5>' +
      '<input class="form-control" id="login" formControlName="login" class="swal2-input">' +
      '<h5>Contraseña<\h5>' +
      '<input class="form-control" id="password" formControlName="password" class="swal2-input">' +
      '<h5>Correo electrónico<\h5>' +
      '<input class="form-control" id="email" formControlName="email" class="swal2-input">',
      focusConfirm: false,
      confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
       
     
    })
    
    if (formValues) {
      this.coger();
    }
  }

  coger() {
    if (this.oForm) {
    this.usuario = {
      id: null,
      login: this.oForm.value.login,
      password: this.oForm.value.password,
      email: this.oForm.value.email 
    };
    console.log(this.usuario);
    this.new();
  }
  }

openModal() {
  const dialogConfig = new MatDialogConfig();
  // The user can't close the dialog by clicking outside its body
  dialogConfig.disableClose = true;
  dialogConfig.id = "modal-component";
  dialogConfig.height = "500px";
  dialogConfig.width = "600px";
  // https://material.angular.io/components/dialog/overview
  const modalDialog = this.matDialog.open(RegistroModalComponent, dialogConfig);
}
}
