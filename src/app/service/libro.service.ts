import { ILibro, ILibro2Send, IPageLibro } from './../model/libro-interfaces';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class LibroService {
  
    sURL = API_URL + '/libro';
  
    constructor(private http: HttpClient) { }
  
    get(id: number): Observable<ILibro> {
      return this.http.get<ILibro>(this.sURL + "/" + id, httpOptions);
    }
  
    removeOne(id: number): Observable<ILibro> {
      return this.http.delete<ILibro>(this.sURL + "/" + id, httpOptions);
    }
  
    newOne(oLibro: ILibro2Send): Observable<ILibro> {
      return this.http.post<ILibro>(this.sURL + "/", oLibro, httpOptions);
    }
  
    update(oLibro: ILibro2Send): Observable<ILibro> {
      return this.http.put<ILibro>(this.sURL + "/", oLibro, httpOptions);
    }
  
    getPage(rpp: number, page: number, filter: string, order: string, direction: string, tipoproducto: number): Observable<IPageLibro> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      if (tipoproducto) {
        strOrderUrl += "&tipoproducto=" + tipoproducto;
      }
      return this.http.get<IPageLibro>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }
  }