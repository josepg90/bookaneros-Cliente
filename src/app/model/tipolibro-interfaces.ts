export interface ITipoLibro {
    id: number,
    genero: string
}
export interface IPageTipoLibro {
    content: ITipoLibro[];
    totalElements: number,
    totalPages: number
}