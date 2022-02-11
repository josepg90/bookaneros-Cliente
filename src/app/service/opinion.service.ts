import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";
import { IPost } from "../model/opinion-interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class OpinionService {

    sURL = API_URL + '/opinion';
  
    constructor(private http: HttpClient) { }

    get(id: number): Observable<IPost> {
        return this.http.get<IPost>(this.sURL + "/" + id, httpOptions);
        
      }
    
  }