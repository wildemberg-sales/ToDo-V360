import { List } from "./list-types"

export type Task = {
    id: number,
    title: string,
    list_id:number,
    description: string,
    priority: string
    date: string,
    time: string,
    completed: boolean,
    created_at: string,
    updated_at: string
}

export type TaskResponse = {
    message:string,
    data: Array<Task>,
    count: number,
    list: List
}

export type TasksFiltered = {
    "late": Array<Task>,
    "notLate": Array<Task>,
    "completed": Array<Task>,
    "countTotal": number,
    "list":List
}