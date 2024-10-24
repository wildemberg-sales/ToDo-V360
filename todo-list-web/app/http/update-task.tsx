import { Task } from "../types/task-types"

export async function updateTask(task: Partial<Task>){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${task.list_id}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}