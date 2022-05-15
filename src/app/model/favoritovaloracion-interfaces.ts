import { ILibro } from "./libro-interfaces";
import { I2Send } from "./model-interfaces";
import { IUsuario } from "./usuario-interfaces";

export interface IFavoritoValoracion {
    id: number,
    favorito: boolean,
    valoracion: number,
    libro: ILibro,
    usuario: IUsuario
}

export interface IFavoritoValoracion2Send {
    id: number,
    favorito: boolean,
    valoracion: number,
    libro: I2Send,
    usuario: I2Send
}