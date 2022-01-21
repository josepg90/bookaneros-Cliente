
export interface IUsuario {
    id: number,
    login: string,
    password: string,
    email: string
}

export interface IPageUsuario {
    IUsuario: [],
    totalElements: number,
    totalPages: number
}
