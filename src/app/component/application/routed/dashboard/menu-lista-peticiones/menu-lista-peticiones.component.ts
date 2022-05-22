import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-menu-lista-peticiones',
  templateUrl: './menu-lista-peticiones.component.html',
  styleUrls: ['./menu-lista-peticiones.component.scss']
})
export class MenuListaPeticionesComponent implements OnInit {

  seccion: number;
  
  constructor(
    public oIconService: IconService
  ) { }

  ngOnInit(): void {
  }

}
