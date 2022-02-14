import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";
import { IPagePost, IPost, IPost2Send } from "../model/opinion-interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class OpinionService {

    sURL = API_URL + '/opinion';
  
    constructor(private http: HttpClient) { }

    get(id: number): Observable<IPost> {
        return this.http.get<IPost>(this.sURL + "/" + id, httpOptions);
        
      }

      getPage(rpp: number, page: number, filter: string, order: string, direction: string, libro: number, usuario: number): Observable<IPagePost> {
        let strOrderUrl: string = "";
        if (order) {
          strOrderUrl += "&sort=" + order + "," + direction;
        }
        if (libro) {
          strOrderUrl += "&filtertype1=" + libro;
        }
        if (usuario) {
          strOrderUrl += "&filtertype2=" + usuario;
        }
        if (filter) {
          strOrderUrl += "&filter=" + filter;
        }
        
        console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
        
        return this.http.get<IPagePost>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
      }
    
      newOne(oPost: IPost2Send): Observable<IPost> {
        return this.http.post<IPost>(this.sURL, oPost, httpOptions);
      }
    
      updateOne(oPost: IPost2Send): Observable<number> {
        return this.http.put<number>(this.sURL + "/" + oPost.id, oPost, httpOptions);        
      }
      removeOne(id: number): Observable<number> {
        return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
      }
  }