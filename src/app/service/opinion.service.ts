import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";
import { IPagePost, IPost } from "../model/opinion-interfaces";

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
        if (libro!=null) {
          strOrderUrl += "&filtertype=" + libro;
        }
        if (filter) {
          strOrderUrl += "&filter=" + filter;
        }
        
        console.log(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl);
        
        return this.http.get<IPagePost>(this.sURL + "?page=" + (page - 1) + "&size=" + rpp + strOrderUrl, httpOptions);
      }
    
  }