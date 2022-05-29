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
  
    removeOne(id: number): Observable<number> {
      return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
    }
  
    newOne(oLibro: ILibro2Send): Observable<ILibro> {
      return this.http.post<ILibro>(this.sURL + "/", oLibro, httpOptions);
    }
  
    update(oLibro: ILibro2Send): Observable<ILibro> {
      return this.http.put<ILibro>(this.sURL + "/" , oLibro, httpOptions);
    }
  
    getPage(rpp: number, page: number, filter: string, order: string, direction: string, tipolibro: number): Observable<IPageLibro> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (tipolibro!=null) {
        strOrderUrl += "&filtertype=" + tipolibro;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPageLibro>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }

    getValoracion(id: number): Observable<any> {
      return this.http.get<any>(this.sURL + "/countValoracion/" + id, httpOptions);
    }

    getFavoritos(rpp: number, page: number, filter: string, order: string, direction: string): Observable<IPageLibro> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPageLibro>(this.sURL + "/favoritos?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }

    getNovedad(rpp: number, page: number, filter: string, order: string, direction: string, tipolibro: number): Observable<IPageLibro> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (tipolibro!=null) {
        strOrderUrl += "&filtertype=" + tipolibro;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPageLibro>(this.sURL + "/novedad?page=" + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }

    getSugerencias(rpp: number, page: number, tipolibro1: number, order: string, direction: string, tipolibro2: number): Observable<IPageLibro> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (tipolibro1!=null) {
        strOrderUrl += "&idTipoLibro1=" + tipolibro1;
      }
      if (tipolibro2) {
        strOrderUrl += "&idTipoLibro2=" + tipolibro2;
      }
      
      console.log(this.sURL + "/sugerencias?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPageLibro>(this.sURL + "/sugerencias?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }
  }