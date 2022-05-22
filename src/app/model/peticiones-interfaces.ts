import { I2Send, IFecha } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IPeticion {
    id: number,
    titulo: string,
    peticion: string,
    fecha: IFecha,
    enproceso: boolean,
    realizado: boolean,
    usuario: IUsuario
}

export interface IPagePeticion {
    content: IPeticion[];
    totalElements: number,
    totalPages: number
}


export interface IPeticion2Send {
    id: number,
    titulo: string,
    peticion: string,
    fecha: IFecha,
    enproceso: boolean,
    realizado: boolean,
    usuario: I2Send
}