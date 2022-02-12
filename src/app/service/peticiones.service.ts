import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";
import { IPagePeticion, IPeticion, IPeticion2Send } from "../model/peticiones-interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class PeticionesService {
  
    sURL = API_URL + '/libro';
  
    constructor(private http: HttpClient) { }
  
    get(id: number): Observable<IPeticion> {
      return this.http.get<IPeticion>(this.sURL + "/" + id, httpOptions);
    }
  
    removeOne(id: number): Observable<IPeticion> {
      return this.http.delete<IPeticion>(this.sURL + "/" + id, httpOptions);
    }
  
    newOne(oLibro: IPeticion2Send): Observable<IPeticion> {
      return this.http.post<IPeticion>(this.sURL + "/", oLibro, httpOptions);
    }
  
    update(oLibro: IPeticion2Send): Observable<IPeticion> {
      return this.http.put<IPeticion>(this.sURL + "/", oLibro, httpOptions);
    }
  
    getPage(rpp: number, page: number, filter: string, order: string, direction: string, tipolibro: number): Observable<IPagePeticion> {
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
      
      return this.http.get<IPagePeticion>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }
  
}