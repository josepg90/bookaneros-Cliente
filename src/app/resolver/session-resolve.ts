import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { catchError } from "rxjs/internal/operators/catchError";
import { IUsuario } from "../model/usuario-interfaces";
import { SessionService } from "../service/session.service";



@Injectable()
export class SessionResolver implements Resolve<Observable<IUsuario>> {

    constructor(private oSessionService: SessionService) { }

    resolve(): Observable<IUsuario> {
        return this.oSessionService.check().pipe(
            catchError(err => of(null))
        );
    }
}