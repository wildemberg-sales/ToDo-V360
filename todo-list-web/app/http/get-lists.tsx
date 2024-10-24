import { ListResponse } from "../types/list-types"

export async function getLists(): Promise<ListResponse> {
    const API_URL = String(process.env.NEXT_PUBLIC_API_URL)
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
}
