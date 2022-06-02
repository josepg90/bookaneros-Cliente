import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.scss']
})
export class NovedadComponent implements OnInit {

  oUserSession: IUsuario;
  strTitleSingular: string = "Novedades";
  
  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService
  ) {
    if (this.oRoute.snapshot.data['message']) {
      this.oUserSession = this.oRoute.snapshot.data['message'];
      console.log(this.oUserSession);

      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
    }
   }

   ngOnInit(): void {
    console.log(this.oUserSession);
  }
}
