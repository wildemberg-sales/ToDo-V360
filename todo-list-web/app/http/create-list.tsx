import { List } from "../types/list-types"

export async function createList(list: Partial<List>){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
    })
}