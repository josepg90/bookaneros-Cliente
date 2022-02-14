
export interface IUsuario {
    id: number,
    login: string,
    password: string,
    email: string
}

export interface IPageUsuario {
    content: IUsuario[],
    totalElements: number,
    totalPages: number
}
