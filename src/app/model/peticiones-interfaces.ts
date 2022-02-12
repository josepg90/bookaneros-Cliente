import { I2Send, IFecha } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IPeticion {
    id: number,
    titulo: string,
    cuerpo: string,
    fecha: IFecha,
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
    cuerpo: string,
    fecha: IFecha,
    usuario: I2Send
}