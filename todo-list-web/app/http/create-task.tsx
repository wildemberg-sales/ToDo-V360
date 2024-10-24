import { Task } from "../types/task-types"

export async function createTask(task: Partial<Task>){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${task.list_id}/tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}