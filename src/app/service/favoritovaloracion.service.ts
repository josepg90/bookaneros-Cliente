import { IFavoritoValoracion, IFavoritoValoracion2Send } from './../model/favoritovaloracion-interfaces';
import { ILibro, ILibro2Send, IPageLibro } from './../model/libro-interfaces';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { API_URL, httpOptions } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class FavoritoValoracionService {
  
    sURL = API_URL + '/fav';
  
    constructor(private http: HttpClient) { }
  
    get(id: number): Observable<IFavoritoValoracion> {
      return this.http.get<IFavoritoValoracion>(this.sURL + "/" + id, httpOptions);
    }
  
    newOne(oFavoritoValoracion: IFavoritoValoracion2Send): Observable<IFavoritoValoracion> {
        return this.http.post<IFavoritoValoracion>(this.sURL + "/", oFavoritoValoracion, httpOptions);
    }

    getValoracionUsuario(filterUsuario: number, filterLibro: number): Observable<any> {
        
        return this.http.get<any>(this.sURL + "/valoracionUsuario?filterUsuario=" + filterUsuario + "&filterLibro=" + filterLibro, httpOptions);
    }

    update(oFavoritoValoracion: IFavoritoValoracion2Send): Observable<number> {
        return this.http.put<number>(this.sURL + "/" + oFavoritoValoracion.id, oFavoritoValoracion, httpOptions);
    }

    getFavoritoUsuario(filterUsuario: number, filterLibro: number): Observable<any> {
        
      return this.http.get<any>(this.sURL + "/favoritoUsuario?filterUsuario=" + filterUsuario + "&filterLibro=" + filterLibro, httpOptions);
  }

  }