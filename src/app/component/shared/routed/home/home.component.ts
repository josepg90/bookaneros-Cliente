import { Component, OnInit } from '@angular/core';
declare var Swal: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  registro() {
    const { value: formValues } = Swal.fire({
      title: 'Registro',
      html:
        '<h5>Nombre de usuario<\h5>' +
        '<input id="swal-input1" class="swal2-input">' +
        '<h5>Contraseña<\h5>' +
        '<input id="swal-input2" class="swal2-input">' +
        '<h5>Correo electrónico<\h5>' +
        '<input id="swal-input3" class="swal2-input">',
      focusConfirm: false,
      
     
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }

}
