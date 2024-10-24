export type List = {
    id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string
}

export type ListResponse = {
    message: string,
    data: Array<List>,
    count:number
}