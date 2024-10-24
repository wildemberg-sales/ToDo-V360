export async function deleteList(id:number){
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}