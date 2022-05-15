import { Component, Input, OnInit } from '@angular/core';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-favoritos-valoracion-new-unrouted',
  templateUrl: './favoritos-valoracion-new-unrouted.component.html',
  styleUrls: ['./favoritos-valoracion-new-unrouted.component.scss']
})
export class FavoritosValoracionNewUnroutedComponent implements OnInit {

  @Input() id :number;
  oMedia:any;

  constructor(
    private oLibroService: LibroService
  ) { }

  ngOnInit(): void {
    this.getValoracion();
  }

  getValoracion = () => {
    this.oLibroService
      .getValoracion(this.id)
      .subscribe((oMedia: any) => {
        this.oMedia = oMedia;
        console.log(oMedia);
        if (this.oMedia == null){
          this.oMedia = "Sin valorar";
        }

      });
  };

}
