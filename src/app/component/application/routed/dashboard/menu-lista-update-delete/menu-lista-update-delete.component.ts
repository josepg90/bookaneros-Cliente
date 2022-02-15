import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-menu-lista-update-delete',
  templateUrl: './menu-lista-update-delete.component.html',
  styleUrls: ['./menu-lista-update-delete.component.scss']
})
export class MenuListaUpdateDeleteComponent implements OnInit {

  seccion: number;

  constructor(
    public oIconService: IconService
  ) { }

  ngOnInit(): void {
  }

}
