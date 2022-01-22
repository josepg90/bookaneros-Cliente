import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URL, uploadHttpOptions } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    uploadImage(imageFile: File): Observable<number> {

        console.log("producto-service imageFile: ", imageFile);
        let headers = new HttpHeaders();

        let params = new HttpParams();
        params.set("withCredentials", true);

        const formData = new FormData();
        formData.append('file', imageFile);

        return this.http.post<number>(API_URL + "/file/upload", formData, uploadHttpOptions);
    }
}