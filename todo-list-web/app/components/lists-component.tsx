'use client';
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { deleteList } from "../http/delete-list";
import { ListResponse, List } from "../types/list-types";


export default function ListsComponent(props: {data: ListResponse, onUpdate: VoidFunction}){
    const queryClient = useQueryClient()
    const lists = props.data.data

    function deleteListFunc(id:number){
        deleteList(id)
        queryClient.invalidateQueries({queryKey: ['lists']}).then(()=>{
            props.onUpdate()
            window.location.reload()
        })
    }

    return(
        <div>
            <h2 className="font-bold text-2xl mb-4 text-[#FF5C13]">Listas Criadas:</h2>
            {
                lists.map((val:List)=>{
                    return(
                        <div key={val.id} id={`container${val.title}`} className="border-2 border-solid border-[#7936BE] bg-[#EEEEEE] mb-2 p-3 rounded-md font-medium flex gap-3 flex-wrap flex-col">
                            <div className="flex gap-3 w-[100%] border-b-2 border-[#7936BE] items-center justify-between">
                                    <h2 className="text-lg text-slate-800e-">{val.title}</h2>
                            </div>
                            <p hidden={val.description? false : true} className="text-md text-slate-800e-">Descrição: {val.description}</p>
                            <div className="flex justify-end gap-4 items-center text-center">
                                <Link href={`/list/${val.id}`} className="border border-[#7936BE] bg-[#7936BE] rounded-lg p-1 w-10 h-10"><Image className="" src={'/icon-eye.png'} alt="" width={40} height={40} loading="lazy"/></Link>
                                <button onClick={()=>deleteListFunc(val.id)} className="border border-[#7936BE] bg-[#7936BE] rounded-lg p-1 w-10 h-10"><Image className="" src={'/icon-lixo.png'} alt="" width={40} height={40} loading="lazy"/></button>
                                <Link href={`/list/${val.id}/edit`} className="border border-[#7936BE] bg-[#7936BE] rounded-lg p-1 w-10 h-10"><Image src={'/icon-pencil.png'} alt="" width={30} height={30} loading="lazy"/></Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}