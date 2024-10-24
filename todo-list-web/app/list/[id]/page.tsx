'use client';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getListTasks } from "../../http/get-list-tasks";
import TasksComponent from "../../components/tasks-component";
import LoadingComponent from "../../components/loading-component";
import EmptyListsComponents from "../../components/empty-components";
import { Task } from "../../types/task-types";

export default function ListPage({params}: {params: {listname:string, id: string}}){
    const router = useRouter()
    const queryCLient = useQueryClient()
    queryCLient.invalidateQueries({queryKey:["listTasks"]})

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["listTasks"],
        queryFn:()=>getListTasks(params.id),
        staleTime: 1000 * 60,
    })

    if(isLoading){
        <LoadingComponent/>
    }

    const percentCompleted = data?.countTotal ? ((data?.completed?.length || 0) / data.countTotal) * 100 : 0

    return (
        <div className='pb-20'>
            <button className="py-2 px-4 border bg-[#592A9E] rounded-xl text-slate-200 transition hover:bg-[#FF5C13]" onClick={()=>router.push(`/`)}>Voltar</button>
            <h2 className="text-2xl font-bold mt-5 mb-5 text-center text-[#FE5C12]">Lista: {data?.list.title}</h2>
            <div className="flex justify-between items-center">
                <div className="w-full bg-gray-200 rounded-md h-4">
                    <div className={`bg-[#592A9E] h-4 rounded-md`} style={{ width: `${percentCompleted}%` }}></div>
                </div><span className="ml-2 text-lg font-semibold">{percentCompleted<100 ? percentCompleted.toPrecision(2) : percentCompleted.toPrecision(3)}%</span>
            </div>
            {
                data?.countTotal?
                    <div>
                        <h2 className="text-xl font-semibold mt-5 mb-2">Atrasadas:</h2>
                        <TasksComponent color="#FE5C12" data={data?.late as Array<Task>} onUpdate={()=>refetch()} />
                        <h2 className="text-xl font-semibold mt-5 mb-2">A Fazer:</h2>
                        <TasksComponent color="#592A9E" data={data?.notLate as Array<Task>} onUpdate={()=>refetch()} />
                        <h2 className="text-xl font-semibold mt-5 mb-2">Completadas:</h2>
                        <TasksComponent color="gray-400" data={data?.completed as Array<Task>} onUpdate={()=>refetch()} />

                        
                    </div>
                :
                    <EmptyListsComponents title="Tarefa"/> 
            }
            <div className='fixed right-4 bottom-4 lg:right-80 bg-[#FF5C13] rounded-[100%] w-12 h-12 flex justify-center items-center transition hover:bg-[#592A9E]'>
                <Link href={`/list/${params.id}/create`} className='text-white text-3xl'>+</Link>
            </div>
        </div>
    )
}