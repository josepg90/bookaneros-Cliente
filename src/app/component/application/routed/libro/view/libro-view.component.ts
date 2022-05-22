import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILibro } from 'src/app/model/libro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { LibroService } from 'src/app/service/libro.service';
import { Location } from '@angular/common';

declare let jsPDF: any;

@Component({
  selector: 'app-libro-view',
  templateUrl: './libro-view.component.html',
  styleUrls: ['./libro-view.component.scss']
})
export class LibroViewComponent implements OnInit {

  strEntity: string = "producto"
  strOperation: string = "view"
  strTitleSingular: string = "Producto";
  strTitlePlural: string = "Productos";
  id: number = null;
  strUsuarioSession: string;
  strResult: string = null;
  oLibro: ILibro;
  oUserSession: IUsuario;
  oMedia: any;

  constructor(
    private oLibroService: LibroService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location
  ) {
    //HASTA QUE NO FUNCIONE EL LOGUEO NO PUEDO PONERLO
    /*if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);

    }*/

    this.id = this.oActivatedRoute.snapshot.params.id
    this.getOne();
    this.getValoracion();
  }

  ngOnInit(): void {
  }

  cabecera(doc: any, oLibro: ILibro): any {
    doc.setFontSize(20)
    doc.text('Ficha Técnica', 25, 25)
    //doc.addImage('', 'JPEG', 140, 15, 40, 35)
    doc.setFontSize(18)
    doc.text('Título', 20, 80)
    doc.setFontSize(16)
    doc.text(oLibro?.titulo, 20, 89)

    doc.setFontSize(18)
    doc.text('Autor', 20, 80)
    doc.setFontSize(14)
    doc.text(oLibro?.autor, 20, 95)

    doc.setFontSize(18)
    doc.text('Género', 20, 80)
    doc.setFontSize(14)
    doc.text(oLibro?.tipolibro, 20, 95)

    doc.setFontSize(18)
    doc.text('Páginas', 20, 80)
    doc.setFontSize(14)
    doc.text(oLibro?.paginas, 20, 95)

    doc.setFontSize(18)
    doc.text('Fecha Publicación', 20, 80)
    doc.setFontSize(14)
    doc.text(oLibro?.fecha_publicacion, 20, 95)

    doc.setFontSize(18)
    doc.text('Resumen', 140, 80)
    doc.setFontSize(14)
    doc.text(oLibro?.resumen, 20, 95)

    return doc;
  }

  getOne = () => {
    this.oLibroService
      .get(this.id)
      .subscribe((oData: ILibro) => {
        this.oLibro = oData;
        console.log(this.oLibro);

      });
  };

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

  print(id: number) {

    this.oLibroService.get(this.id).subscribe((oData: ILibro) => {
      this.oLibro = oData;
      console.log(this.oLibro);
      
       var imgData2 = 'http://localhost:8082/file/' + this.oLibro?.imagen;       
      
      var doc = new jsPDF()

      doc.setFontSize(20)
      doc.text('Ficha Técnica', 25, 25)
      doc.addImage(imgData2, 'JPG', 140, 15, 60, 90)
      doc.setFontSize(18)
      doc.text('Título:', 20, 80)
      doc.setFontSize(16)
      doc.text(this.oLibro.titulo, 60, 80)

      doc.setFontSize(18)
      doc.text('Autor:', 20, 90)
      doc.setFontSize(14)
      doc.text(this.oLibro.autor, 60, 90)

      doc.setFontSize(18)
      doc.text('Género:', 20, 100)
      doc.setFontSize(14)
      doc.text(this.oLibro.titulo, 60, 100)

      doc.setFontSize(18)
      doc.text('Páginas:', 20, 110)
      doc.setFontSize(14)
      doc.text(this.oLibro.paginas + "", 60, 110)

      doc.setFontSize(18)
      doc.text('Publicación:', 20, 120)
      doc.setFontSize(14)
      doc.text(this.oLibro.fecha_publicacion + "", 60, 120)

      doc.setFontSize(18)
      doc.text('Resumen:', 20, 130)
      doc.setFontSize(12)

      var str = this.oLibro.resumen;
      var trozos = [];
      var palabras = [];

      for (var i = 0, charsLength = str.length; i < charsLength; i += 66) {
        trozos.push(str.substring(i, i + 66));
      }

      console.log(trozos);

      //DIVISION DEL RESUMEN EN PALABRAS
      //INTENTAR JUNTAR DE 10 EN 10 
      palabras= str.split("/\w+|\s+|[^\s\w]+/g");
      console.log(palabras);
      //

      var linea = 130;

      for (let i = 0; i < trozos.length; i++) {

        doc.text(trozos[i], 60, linea)
        linea+=7;

      }

      //INTENTAR JUNTAR DE 10 EN 10 
      /*for (let i = 0; i < palabras.length; i++) {

        doc.text(trozos[i]+" "+trozos[i+1]+" "+trozos[i+2]+" "+trozos[i+3]+" "+trozos[i+4]+" "+trozos[i+5]+" "+trozos[i+6]+" "+trozos[i+7]+" ", 60, linea)
        linea+=10;
        
      }*/

      //doc.setFontSize(14)
      //doc.text(this.oLibro.resumen, 60, 130)

      doc.save(this.oLibro.titulo + "- Ficha Tecnica.pdf");

    })


  }

  goBack() {
    this.oLocation.back();
  }

}
