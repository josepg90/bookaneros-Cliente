import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsuarioUpdateUnroutedComponent } from '../../../unrouted/usuario/usuario-update-unrouted/usuario-update-unrouted.component';

@Component({
  selector: 'app-usuario-view',
  templateUrl: './usuario-view.component.html',
  styleUrls: ['./usuario-view.component.scss']
})
export class UsuarioViewComponent implements OnInit {

  id: number =null;
  strUsuarioSession: string;
  strEntity: string = "usuario";
  strOperation: string = "view";
  strTitleSingular:string= "usuario";
  oUsuarioSession: IUsuario;


  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    public oIconService: IconService,
    public matDialog: MatDialog

  ) { 
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

    this.id = this.oActivatedRoute.snapshot.params.id;
    console.log(this.id);
        
  }

  ngOnInit(): void {
  }

  openModal(id: number) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "500px";
    dialogConfig.width = "600px";
    dialogConfig.data = { id: this.oUsuarioSession.id}
    console.log(this.oUsuarioSession.id);
    
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UsuarioUpdateUnroutedComponent, dialogConfig);
  }

  goBack() {
    this.oLocation.back();
  }

}
