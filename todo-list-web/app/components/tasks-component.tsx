"use client"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import { updateTask } from "../http/update-task"
import Image from "next/image"
import { deleteTask } from "../http/delete-task"
import Link from "next/link"
import { Task } from "../types/task-types"

dayjs.extend(utc)

type PropsParams = {
    color: string,
    data: Array<Task>,
    onUpdate: VoidFunction
}

export default function TasksComponent(props: PropsParams){
    const queryClient = useQueryClient()

    function changeStateTask(newCompleted:boolean, task:Task){
        task.completed = newCompleted
        updateTask(task)
        queryClient.invalidateQueries({queryKey: ['listTasks']}).then(()=>{
            props.onUpdate()
        })
    }

    function deleteTaskFunc(task:Task){
        deleteTask(task)
        queryClient.invalidateQueries({queryKey: ['listTasks']}).then(()=>{
            props.onUpdate()
        })
    }
    
    return(
        <div className="">
            {
                props.data?.map((val)=>{
                    return(
                        <div key={val.id} className={`${props.color === 'gray-400' ? 'bg-gray-400' : 
                                                        props.color === '#FE5C12' ? 'bg-[#FE5C12]' : 
                                                        props.color === '#592A9E' ? 'bg-[#592A9E]' : ''}  mb-2 p-3 rounded-md font-medium flex gap-3 flex-wrap flex-col`}>
                            <div className="flex gap-3 w-[100%] border-b-2 items-center justify-between">
                                <div className="flex gap-3 w-[50%]">
                                    <input className="cursor-pointer" type="checkbox" checked={val.completed} onChange={()=>changeStateTask(!val.completed, val)}/>
                                    <p className="text-lg text-slate-200">{val.title}</p>
                                </div>
                                <p className="text-slate-200 w-[50%] text-end">Prioridade: <span className={`border border-white text-slate-200 px-2 rounded-md ${val.priority === 'Baixa' ? 'bg-green-500' :
                                                                                                                                                        val.priority === 'Média' ? 'bg-blue-500' :
                                                                                                                                                        'bg-red-600'}`}>{val.priority}</span></p>
                            </div>
                            <p hidden={val.description ? false : true} className="text-md text-slate-200">Descrição:<br/> {val.description}</p>
                            <p hidden={val.date ? false : true} className="text-sm text-slate-200">A Realizar no Dia: {dayjs(val.date).format("DD/MM/YYYY")}</p>
                            <p hidden={val.time ? false : true} className="text-sm text-slate-200">A Realizar na Hora: {dayjs(val.time).utc().format("HH:mm")}</p>
                            <div className="flex justify-end gap-4 items-center text-center">
                                <button className="border border-white rounded-lg p-1 w-10 h-10" onClick={()=>deleteTaskFunc(val)}><Image src={'/icon-lixo.png'} alt="" width={40} height={40} loading="lazy"/></button>
                                <Link href={`/list/${val.list_id}/edit/${val.id}`} className="border border-white rounded-lg p-1 w-10 h-10" onClick={()=>{}}><Image src={'/icon-pencil.png'} alt="" width={30} height={30} loading="lazy"/></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}