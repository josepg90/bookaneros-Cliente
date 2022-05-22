
export interface IUsuario {
    id: number,
    login: string,
    password: string,
    email: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    pais: string,
    intereses: string
}

export interface IPageUsuario {
    content: IUsuario[],
    totalElements: number,
    totalPages: number
}
