import { List } from "../types/list-types"

export async function getList(id:number): Promise<{message:string, data:List}> {
    const API_URL = String(process.env.NEXT_PUBLIC_API_URL)
    const response = await fetch(`${API_URL}/${id}`)
    const data = await response.json()
    return data
}
