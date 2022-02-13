import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { IPageTipoLibro, ITipoLibro } from '../model/tipolibro-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TipolibroService {
  constructor(private http: HttpClient) { }

  sURL = API_URL + '/tipolibro';

  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string
  ): Observable<IPageTipoLibro> {
    let strUrl: string = '';
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    
    console.log(this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
    
    return this.http.get<IPageTipoLibro>(
      this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
  }

  getOne(id: number): Observable<ITipoLibro> {
    return this.http.get<ITipoLibro>(this.sURL + '/' + id, httpOptions);
  }

  newOne(oTipoProducto: ITipoLibro): Observable<ITipoLibro> {
    return this.http.post<ITipoLibro>(
      this.sURL + '/',
      oTipoProducto,
      httpOptions
    );
  }

  updateOne(oTipoProducto: ITipoLibro): Observable<ITipoLibro> {
    return this.http.put<ITipoLibro>(
      this.sURL + '/',
      oTipoProducto,
      httpOptions
    );
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }
}