import { Task } from "../types/task-types"

export async function getTask(id:number, taskid:number): Promise<{message:string, data:Task}> {
    const API_URL = String(process.env.NEXT_PUBLIC_API_URL)
    const response = await fetch(`${API_URL}/${id}/tasks/${taskid}`)
    const data = await response.json()
    return data
}
