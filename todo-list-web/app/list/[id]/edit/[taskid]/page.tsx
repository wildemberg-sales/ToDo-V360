'use client';
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { getTask } from "../../../../http/get-task";
import LoadingComponent from "../../../../components/loading-component";
import { updateTask } from "../../../../http/update-task";

dayjs.extend(utc)

type PartialTask = {
    id:number,
    list_id:number,
    title: string,
    description?: string,
    priority: string
    date?: string,
    time?: string,
    completed:boolean
}

export default function EditTaskPage({params}: {params: {id: number, taskid:number}}){
    const queryClient = useQueryClient()
    const router = useRouter()

    const {data, isLoading} = useQuery({
        queryKey: ["task"],
        queryFn:()=>getTask(params.id, params.taskid),
        staleTime: 1000 * 60,
    })

    const [title, setTitle] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>()
    const [priority, setPriority] = React.useState<string>("Baixa")
    const [date, setDate] = React.useState<string>("")
    const [time, setTime] = React.useState<string>("")
    const [completed, setCompleted] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (data) {
            setTitle(data.data.title);
            setDescription(data.data.description);
            setPriority(data.data.priority)
            setDate(data.data.date)
            const formattedTime = dayjs(data.data.time).isValid() 
                ? dayjs(data.data.time).utc().format('HH:mm') 
                : "";
            setTime(formattedTime)
            setCompleted(data.data.completed)
        }
    }, [data]);

    if(isLoading){
        return(
            <LoadingComponent/>
        )
    }

    function onSubmit(){
        const task: PartialTask = {
            id: params.taskid,
            list_id: params.id,
            title: title? title : "Task",
            description,
            priority,
            date,
            time,
            completed
        }
        updateTask(task)
        queryClient.invalidateQueries({queryKey: ['listTasks']})
        queryClient.invalidateQueries({queryKey: ['task']})
        router.push(`/list/${params.id}`)
    }

    return(
        <div>
            <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>router.push(`/list/${params.id}`)}>Voltar</button>
            <h2 className="text-xl font-semibold mt-5 mb-2 text-center">Editando Task: {title}</h2>
            <div className="flex justify-center items-center flex-col flex-wrap gap-4 text-center">
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

                <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>onSubmit()}>Atualizar</button>
            </div>
        </div>
    )
}