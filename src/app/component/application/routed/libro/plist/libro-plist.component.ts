import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ILibro, IPageLibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { LibroService } from 'src/app/service/libro.service';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-libro-plist',
  templateUrl: './libro-plist.component.html',
  styleUrls: ['./libro-plist.component.scss']
})
export class LibroPlistComponent implements OnInit {
  

  constructor( ) { }

  ngOnInit(): void {
    
  }


}