import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";
import { IPagePeticion, IPeticion, IPeticion2Send } from "../model/peticiones-interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class PeticionesService {
  
    sURL = API_URL + '/peticiones';
  
    constructor(private http: HttpClient) { }
  
    get(id: number): Observable<IPeticion> {
      return this.http.get<IPeticion>(this.sURL + "/" + id, httpOptions);
    }
  
    removeOne(id: number): Observable<number> {
      return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
    }
  
    newOne(oPeticion: IPeticion2Send): Observable<IPeticion> {
      return this.http.post<IPeticion>(this.sURL + "/", oPeticion, httpOptions);
    }
  
    update(oPeticion: IPeticion2Send): Observable<number> {
      return this.http.put<number>(this.sURL + "/" + oPeticion.id, oPeticion, httpOptions);
    }
  
    getPeticiones(rpp: number, page: number, filter: string, order: string, direction: string): Observable<IPagePeticion> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPagePeticion>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }

    getPeticionesEnProceso(rpp: number, page: number, filter: string, order: string, direction: string): Observable<IPagePeticion> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPagePeticion>(this.sURL + "/enproceso?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }

    getPeticionesRealizadas(rpp: number, page: number, filter: string, order: string, direction: string): Observable<IPagePeticion> {
      let strOrderUrl: string = "";
      if (order) {
        strOrderUrl += "&sort=" + order + "," + direction;
      }
      if (filter) {
        strOrderUrl += "&filter=" + filter;
      }
      
      console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
      
      return this.http.get<IPagePeticion>(this.sURL + "/realizado?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
    }
  
}