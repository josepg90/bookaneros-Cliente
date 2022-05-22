import { SessionService } from 'src/app/service/session.service';
import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IconService } from 'src/app/service/icon.service';
import { timeout } from 'rxjs/operators';
import { ITipoLibro } from 'src/app/model/tipolibro-interfaces';
import { TipolibroService } from 'src/app/service/tipolibro.service';
import { FileService } from 'src/app/service/file.service';
import { ILibro, ILibro2Send } from 'src/app/model/libro-interfaces';
import { LibroService } from 'src/app/service/libro.service';
import { TipolibroPlistUnroutedComponent } from '../../tipolibro/tipolibro-plist-unrouted/tipolibro-plist-unrouted.component';

declare let $: any;
declare var Swal: any;

@Component({
  selector: 'app-libro-update-unrouted',
  templateUrl: './libro-update-unrouted.component.html',
  styleUrls: ['./libro-update-unrouted.component.scss']
})
export class LibroUpdateUnroutedComponent implements OnInit {

  @Input() strOperation: string = null;
  @Input() id: number = null;
  @Output() msg = new EventEmitter<any>();

  usuario: IUsuario;
  oForm: FormGroup;
  strEntity: string = 'tipolibro';
  strTitleSingular: string = 'Tipo de Libro';
  strTitlePlural: string = 'Tipo de Libros';
  strUsuarioSession: string;

  oLibro2Show: ILibro;
  oLibro2Send: ILibro2Send;
  oLibro2Keep: ILibro2Send;
  
  strResult: string = null;
  oUsuarioSession: IUsuario;
  oUserSession: IUsuario;
  oTipoLibro: ITipoLibro;
  

  get f() {
    return this.oForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<LibroUpdateUnroutedComponent>,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oRoute: ActivatedRoute,
    private oLibroService: LibroService,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    public oIconService: IconService,
    private oSessionService: SessionService,
    private oFileService: FileService,
    public matDialog: MatDialog
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      //oRouter.navigate(['/home']);
    }
    this.id = data.id;
    //this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    console.log(this.id);

    //this.id = this.oActivatedRoute.snapshot.params.id; 
       
    this.getOne();
   }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      codigo: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      fecha_publicacion: [''],
      resumen: ['', [Validators.required]],
      imagen: [''],
      paginas: ['', [Validators.required]],
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

  getOne = (): void => {
    this.oLibroService
      .get(this.id)
      .subscribe((oData: ILibro) => {
        this.oLibro2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oLibro2Show.id],
          codigo: [this.oLibro2Show.codigo, [Validators.required, Validators.minLength(4)]],
          titulo: [this.oLibro2Show.titulo, [Validators.required, Validators.minLength(1)]],
          autor: [this.oLibro2Show.autor, [Validators.required, Validators.minLength(5)]],
          fecha_publicacion: [''],
          resumen: [this.oLibro2Show.resumen, [Validators.required, Validators.minLength(5)]],
          imagen: [this.oLibro2Show.imagen],
          paginas: [this.oLibro2Show.paginas, [Validators.required, Validators.minLength(2)]],
          novedad: [this.oLibro2Show.novedad],
          tipolibro: [this.oLibro2Show.tipolibro.id, [Validators.required, Validators.minLength(5)]],
      }); 
      console.log(this.oLibro2Show);
    });  
  };

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
        console.log("HOLA");
        this.oLibro2Send = {
          id: this.oForm.value.id,
          codigo: this.oForm.value.codigo,
          titulo: this.oForm.value.titulo, 
          autor: this.oForm.value.autor, 
          fecha_publicacion: this.oForm.value.fecha_publicacion.replace("-", "/").replace("-", "/"),
          resumen: this.oForm.value.resumen,
          imagen: img,
          paginas: this.oForm.value.paginas,
          novedad: this.oForm.value.novedad,          
          tipolibro: { id: this.oForm.value.tipolibro }
        }
        //console.log(this.oProducto2Send)
        console.log(this.oLibro2Send)
          this.oLibroService
            .update(this.oLibro2Send)
            .subscribe((oLibro: ILibro) => {
              console.log("HOLAAAA");
              if (oLibro.id) {
                this.strResult = this.strTitleSingular + ' modificado correctamente';
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'middle',
                  showConfirmButton: false,
                  timer: 2500,
                  timerProgressBar: true,
                  didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
            this.closeModal();
                Toast.fire({
                  icon: 'success',
                  title: 'Editado correctamente'
                })
              } else {
                this.strResult = this.strTitleSingular + ': error en la modificación del registro';
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algo ha fallado'            
                })
              }
              //this.openPopup();

              this.msg.emit({ strMsg: this.strResult, id: this.id });
            });
      }
    }
  }


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
      console.log("HOLA");
    }

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

  /*onSubmit(): void {
    if (this.oForm) {
      this.oTipoLibro2Send = {
        id: this.oForm.value.id,
        genero: this.oForm.value.genero
      };

      this.update();
      
    }
  }

  update = (): void => {
    console.log(this.oTipoLibro2Send);
    this.oTipoLibroService
      .updateOne(this.oTipoLibro2Send)
      .subscribe((id: number) => {
        if (id) {
          this.id = id;
          const Toast = Swal.mixin({
            toast: true,
            position: 'middle',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
      this.closeModal();
          Toast.fire({
            icon: 'success',
            title: 'Editado correctamente'
          })
         
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado'            
          })
        }
      });
      setTimeout(() => {
        window.location.reload();
    }, 2500);
      
  };*/

  cerrar(): void {
    this.oRouter.navigate(['/dashboard']);
  }

  goBack(): void {
    this.oLocation.back();
  }

  reloadCurrentPage() {
    window.location.reload();
   }

// When the user clicks the action button a.k.a. the logout button in the\
// modal, show an alert and followed by the closing of the modal
actionFunction() {
  alert("You have logged out.");
  this.closeModal();
}

// If the user clicks the cancel button a.k.a. the go back button, then\
// just close the modal
closeModal() {
  this.dialogRef.close({ event: 'close', data: this.id });
}

}
