import { TipolibroPlistUnroutedComponent } from './../../tipolibro/tipolibro-plist-unrouted/tipolibro-plist-unrouted.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { LibroService } from 'src/app/service/libro.service';
import { Location } from '@angular/common';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { ILibro, ILibro2Send } from 'src/app/model/libro-interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FileService } from 'src/app/service/file.service';


declare let $: any;
declare var Swal: any;

@Component({
  selector: 'app-libro-new-unrouted',
  templateUrl: './libro-new-unrouted.component.html',
  styleUrls: ['./libro-new-unrouted.component.scss']
})
export class LibroNewUnroutedComponent implements OnInit {

  @Input() strOperation: string = null;
  @Input() id: number = null;
  @Output() msg = new EventEmitter<any>();
  
  strEntity: string = 'libro';
  strTitleSingular: string = 'Libro';
  strTitlePlural: string = 'Libros';
  oLibro2Send: ILibro2Send = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oTipoLibro: ITipoLibro;
  oUserSession: IUsuario;
  oLibro2Keep: ILibro2Send;
  oLibro2Show: ILibro = null;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLibroService: LibroService,
    private oLocation: Location,
    public oIconService: IconService,
    public matDialog: MatDialog,
    private oFileService: FileService

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
      codigo: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      autor: [''],
      fecha_publicacion: [''],
      resumen: [''],
      imagen: [''],
      paginas: [''],
      novedad: [''],
      tipolibro: ['', [Validators.required]],
      genero: ['']
    });
    $('#fecha_publicacion').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha_publicacion'].setValue(dateText);
        this.oForm.controls['fecha_publicacion'].markAsDirty();
      }
    });
  }

  processFile($event: any) {
    const reader = new FileReader();

    if ($event.target.files && $event.target.files.length) {
      this.selectedFiles = $event.target.files;
      if (this.selectedFiles) {
        this.file2Send = this.selectedFiles.item(0);
        this.selectedFile = this.file2Send.name;
        if (this.file2Send) {
          reader.readAsDataURL(this.file2Send);
          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.oForm.controls['imagen'].markAsDirty();
            //this.oForm.patchValue({
            //  imagen: reader.result
            //});

          };
        }
      }
    }
  }

  selectedFiles?: FileList;
  imageSrc: string = null;
  file2Send: File = null;
  selectedFile: string;

  save(img:number): void {
    if (this.oForm.valid) {
      if (this.oForm) {
        this.oLibro2Send = {
          id: this.id,
        codigo: this.oForm.value.codigo,
        titulo: this.oForm.value.titulo,
        autor: this.oForm.value.autor,
        fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
        resumen: this.oForm.value.resumen,
        imagen: img,
        paginas: this.oForm.value.paginas,
        novedad: this.oForm.value.novedad,
        tipolibro: {
          id: this.oForm.value.tipolibro,
        },
        }
        //console.log(this.oLibro2Send)
       // if (this.strOperation == "new") {
          this.oLibroService
            .newOne(this.oLibro2Send)
            .subscribe((oLibro: ILibro) => {
              console.log('dentro de new');
              if (oLibro.id) {
                this.id = oLibro.id;
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

                this.strResult = 'El/La ' + this.strTitleSingular + ' se ha creado correctamente con el id: ' + oLibro.id;
                this.cerrar();   

              } else {
                this.strResult = 'Error en la creación de ' + this.strTitleSingular;
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo ha fallado'            
                })
              }
              //this.openPopup();
              this.msg.emit({ strMsg: this.strResult, id: this.id });
            });
        /*} else {
          this.oLibroService
            .update(this.oLibro2Send)
            .subscribe((oLibro: ILibro) => {
              if (oLibro.id) {
                this.strResult = this.strTitleSingular + ' modificado correctamente';
              } else {
                this.strResult = this.strTitleSingular + ': error en la modificación del registro';
              }
              //this.openPopup();

              this.msg.emit({ strMsg: this.strResult, id: this.id });
            });
        }*/
      }
    }
  }

  /*onSubmit(): void {
    if (this.oForm) {
      this.oLibro2Send = {
        id: null,
        codigo: this.oForm.value.codigo,
        titulo: this.oForm.value.titulo,
        autor: this.oForm.value.autor,
        fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
        resumen: this.oForm.value.resumen,
        imagen: this.oForm.value.imagen,
        paginas: this.oForm.value.paginas,
        novedad: this.oForm.value.novedad,
        tipolibro: {
          id: this.oForm.value.tipolibro,
        },
      };
      console.log(this.oLibro2Send);
      
      this.new();
    }
  }

  new = (): void => {
    this.oLibroService
      .newOne(this.oLibro2Send)
      .subscribe((oLibro: ILibro) => {
        if (oLibro.id) {
          this.id = oLibro.id;
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
          
          this.cerrar();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
       
      });
  };*/
  onSubmit(): void {
    //console.log("-->nombre: ", this.selectedFile);
    //const file: File = imageInput.files[0];
    //this.selectedFile = new ImageSnippet(  this.imageSrc , file);
    if (this.imageSrc) {
      this.oFileService.uploadImage(this.file2Send).subscribe(
        (serverResponse) => {
          this.save(serverResponse);
        },
        (err) => {
          this.strResult = this.strTitleSingular + 'Error al cambiar el registro: ' + err.error.message;
          console.log("Img Upload error:", err.error.message);
          //this.openPopup();
          this.msg.emit({ strMsg: this.strResult, id: 0 });
        })
    } else {
      this.save(this.oForm.value.imagen);
    }

  }

  goBack(): void {
    this.oLocation.back();
  }

  cerrar(): void {
    this.oRouter.navigate(['/libro/'+ this.id]);
  }

  onChangeProducto($event: any) {

    console.log("--->" + this.oForm.controls['tipolibro'].value);
    this.oForm.controls['tipolibro'].markAsDirty();

    

    //actualizar el usuario
    this.oLibroService
      .get(this.oForm.controls['tipolibro'].value)
      .subscribe((oData: ILibro) => {
        this.oLibro2Send.tipolibro = oData;
        //this.oUsuario = oData;
      });

    return false;
  }

  openModal() {
    this.oLibro2Keep = {
      id: null,
      codigo: this.oForm.value.codigo,
      titulo: this.oForm.value.titulo,
      autor: this.oForm.value.autor,
      fecha_publicacion: this.oForm.value.fecha_publicacion,
      resumen: this.oForm.value.resumen,
      imagen: this.oForm.value.imagen,
      paginas: this.oForm.value.paginas,
      novedad: this.oForm.value.novedad,
      tipolibro: null,
    };
    console.log(this.oLibro2Keep);

    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "550px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TipolibroPlistUnroutedComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(res => {
      console.log(res.data);
      console.log(res.data2);
      

      this.oForm = this.oFormBuilder.group({
        codigo: [this.oLibro2Keep.codigo],
        titulo: [this.oLibro2Keep.titulo],
        autor: [this.oLibro2Keep.autor],
        fecha_publicacion: [this.oLibro2Keep.fecha_publicacion],
        resumen: [this.oLibro2Keep.resumen],
        imagen: [this.oLibro2Keep.imagen],
        paginas: [this.oLibro2Keep.paginas],
        novedad: [this.oLibro2Keep.novedad],
        tipolibro: [res.data, Validators.required],
        genero: [res.data2]
      });
      
    })
  }

}