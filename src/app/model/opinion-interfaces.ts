import { ILibro } from 'src/app/model/libro-interfaces';
import { I2Send, IFecha } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IPost {
    id: number,
    titulo: string,
    cuerpo: string,
    fecha_publicacion: IFecha,
    libro: ILibro,
    usuario: IUsuario
    
}

export interface IPagePost {
    content: IPost[];
    totalElements: number,
    totalPages: number
}

export interface IPost2Send {
    id: number,
    titulo: string,
    cuerpo: string,
    fecha_publicacion: IFecha,
    libro: I2Send,
    usuario: I2Send
    
}