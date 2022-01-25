import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import { IPageUsuario, IUsuario } from '../model/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/usuario';

  getPage(rpp: number, page: number, order: string, direction: string, filter: string): Observable<IPageUsuario> {
    let strOrderUrl: string = "";
    let filterStr: string = "";
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filter) {
      filterStr += "&filter=" + filter;
    }
    page--;
    return this.http.get<IPageUsuario>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr, httpOptions);
  }

  getPageFiltered(rpp: number, page: number, order: string, direction: string, filter: string, tipoproducto: number): Observable<IPageUsuario> {
    let strOrderUrl: string = "";
    let filterStr: string = "";
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filter) {
      filterStr += "&filter=" + filter;
    }
    page--;
    return this.http.get<IPageUsuario>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr + "&filtertype=" + tipoproducto, httpOptions);
  }


  getOne(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.sURL + "/" + id, httpOptions);
  }

  newOne(oUsuario: IUsuario): Observable<number> {
    return this.http.post<number>(this.sURL + "/new", oUsuario, httpOptions);
  }

  updateOne(oUsuario: IUsuario): Observable<number> {
    return this.http.put<number>(this.sURL + "/" + oUsuario.id, oUsuario, httpOptions);
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }


}