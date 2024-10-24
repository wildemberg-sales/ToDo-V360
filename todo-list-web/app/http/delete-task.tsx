import { Task } from "../types/task-types"

export async function deleteTask(task: Partial<Task>){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${task.list_id}/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}