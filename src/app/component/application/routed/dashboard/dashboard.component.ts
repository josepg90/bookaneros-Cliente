import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  opcion: number;
  recarga: number;

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          new_genero: { cols: 1, rows: 1 },
          new_libro: { cols: 1, rows: 1 },
          new_usuario: { cols: 1, rows: 1 }
          //alto: { cols: 1, rows: 1 },           
           /*[ { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Añadir nuevo Libro', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Añadir nuevo Género', cols: 1, rows: 1 }]*/
        };
      }

      return {
        new_genero: { cols: 2, rows: 1 },
        new_libro: { cols: 1, rows: 4 },
        new_usuario: { cols: 1, rows: 4 }
        //alto: { cols: 1, rows: 3 },
        
      
      /*[
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Añadir nuevo Libro', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Añadir nuevo Género', cols: 1, rows: 1 }
      ]*/
    };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
  hola() {
    console.log(this.opcion);
  }
}
