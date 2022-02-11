import { ILibro } from 'src/app/model/libro-interfaces';
import { IFecha } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IPost {
    id: number,
    titulo: string,
    cuerpo: string,
    fecha_publicacion: IFecha,
    libro: ILibro,
    usuario: IUsuario
    
}