'use client';
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { getList } from "../../../http/get-list";
import LoadingComponent from "../../../components/loading-component";
import { updateList } from "../../../http/update-list";
import { List } from "../../../types/list-types";

export default function EditListPage({params}: {params: {id: number}}){
    const queryClient = useQueryClient()
    const router = useRouter()

    const {data, isLoading} = useQuery({
        queryKey: ["list"],
        queryFn:()=>getList(params.id),
        staleTime: 1000 * 60,
    })

    const [title, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    React.useEffect(() => {
        if (data) {
            setTitle(data.data.title);
            setDescription(data.data.description);
        }
    }, [data]);

    if(isLoading){
        return(
            <LoadingComponent/>
        )
    }

    function onSubmit(){
        const list: Partial<List> = {
            id: params.id,
            title: title? title : "Lista",
            description
        }
        updateList(list)
        queryClient.invalidateQueries({queryKey: ['lists']})
        queryClient.invalidateQueries({queryKey: ['list']})
        router.push('/')
    }
    

    return(
        <div>
            <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>router.push(`/list/${params.id}`)}>Voltar</button>
            <h2 className="text-xl font-semibold mt-5 mb-2">Editando Lista: {data?.data.title}</h2>
            <div className="flex justify-center items-center flex-col flex-wrap gap-4 text-center">
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Título da Tarefa:
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Título da tarefa..." type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Descrição da Tarefa (Opcional):
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Descrição da tarefa..." type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>onSubmit()}>Atualizar</button>
            </div>
        </div>
    )
}