'use client';
import React from "react";
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { createList } from "../../http/create-list";
import { List } from "../../types/list-types";


export default function CreateListPage(){
    const queryClient = useQueryClient()
    const router = useRouter()

    const [title, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    function onSubmit(){
        const list: Partial<List> = {
            title: title? title : "Lista",
            description
        }
        createList(list)
        queryClient.invalidateQueries({queryKey: ['lists']})
        router.push('/')
    }

    return(
        <div className="">
            <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>router.push(`/`)}>Voltar</button>
            <h2 className="text-xl font-semibold mt-5 mb-2 text-center">Criando Lista</h2>
            <div className="text-center flex justify-center items-center flex-col flex-wrap gap-4">
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Título da Tarefa:
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Título da tarefa..." type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Descrição da Tarefa (Opcional):
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Descrição da tarefa..." type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>onSubmit()}>Cadastrar</button>
            </div>
        </div>
    )
}