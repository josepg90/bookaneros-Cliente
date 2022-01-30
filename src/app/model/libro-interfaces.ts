import { I2Send, IFecha } from "./model-interfaces";
import { ITipoLibro } from "./tipolibro-interfaces";

export interface ILibro {
    id: number,
    codigo: number,
    titulo: string,
    autor: string,
    fecha_publicacion: IFecha,
    resumen: string,
    imagen: number,
    paginas: number,
    novedad: boolean,
    tipolibro: ITipoLibro    
}

export interface ILibro2Send {
    id: number,
    codigo: number,
    titulo: string,
    autor: string,
    fecha_publicacion: string,
    resumen: string,
    imagen: number,
    paginas: number,
    novedad: boolean,
    tipolibro: I2Send    
}

export interface IPageLibro {
    content: ILibro[];
    totalElements: number,
    totalPages: number
}