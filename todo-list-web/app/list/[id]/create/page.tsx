'use client';
import React from "react";
import { useQueryClient } from "@tanstack/react-query"
import { createTask } from "../../../http/create-task";
import { useRouter } from "next/navigation";
import { Task } from "../../../types/task-types";

export default function CreateTaskPage({params}: {params: {id: string}}){
    const queryClient = useQueryClient()
    const router = useRouter()

    const [title, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>()
    const [priority, setPriority] = React.useState<string>("Baixa")
    const [date, setDate] = React.useState<string>("")
    const [time, setTime] = React.useState<string>("")
    const [completed, setCompleted] = React.useState<boolean>(false)

    function onSubmit(){
        const task: Partial<Task> = {
            list_id: Number(params.id),
            title: title? title : "Task",
            description,
            priority,
            date,
            time,
            completed
        }
        createTask(task)
        queryClient.invalidateQueries({queryKey: ['listTasks']})
        router.push(`/list/${params.id}`)
    }

    return(
        <div className="">
            <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>router.push(`/list/${params.id}`)}>Voltar</button>
            <h2 className="text-xl font-semibold mt-5 mb-2 text-center">Criando Task</h2>
            <div className="flex justify-center items-center flex-col flex-wrap gap-4">
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Título da Tarefa:
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Título da tarefa..." type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </label>
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Descrição da Tarefa (Opcional):
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Descrição da tarefa..." type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </label>
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Prioridade da Tarefa:
                    <select className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" value={priority} name="priority" onChange={(e)=>setPriority(e.target.value)}>
                        <option value={"Baixa"}>Baixa</option>
                        <option value={"Média"}>Média</option>
                        <option value={"Alta"}>Alta</option>
                    </select>
                </label>

                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Data para completar (Opcional):
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Data para cumprir..." type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                </label>
                <label className="w-[100%] text-start text-lg text-[#592A9E]">
                    Horário da tarefa:
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-[100%]" placeholder="Horário para cumprir..." type="time" name="time" value={time} onChange={(e)=>setTime(e.target.value)}/>
                </label>
                
                <div className="w-[100%] text-start text-lg flex justify-start gap-3">
                    <p>Esta tarefa já foi cumprida?</p>
                    <input className="border border-[#592A9E] py-1 px-2 rounded-lg w-5" placeholder="Tarefa foi Cumprida?" type="checkbox" name="completed" checked={completed} onChange={()=>setCompleted(!completed)}/>
                </div>

                <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>onSubmit()}>Cadastrar</button>
            </div>
        </div>
    )
}