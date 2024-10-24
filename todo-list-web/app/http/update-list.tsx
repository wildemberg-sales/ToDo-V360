import { List } from "../types/list-types"

export async function updateList(list: Partial<List>){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${list.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
    })
}