import dayjs from "dayjs"
import { TaskResponse, TasksFiltered } from "../types/task-types"

function filterTasks(res: TaskResponse):TasksFiltered{
    const filtered: TasksFiltered = {
        "late": [],
        "notLate": [],
        "completed": [],
        "countTotal": res.count,
        "list":res.list
    }

    res.data.forEach(val=>{
        if(val.completed){
            return filtered.completed.push(val)
        }
        if(!val.date){
            return filtered.notLate.push(val)
        }

        const nowDate = dayjs()
        const dateVal = dayjs(val.date)
        const dateFormated = dateVal.hour(nowDate.hour())
                                    .minute(nowDate.minute()) 
                                    .second(nowDate.second())
                                    .millisecond(nowDate.millisecond());

        if(nowDate.isBefore(dateFormated) || nowDate.isSame(dateFormated)){
            console.log(val.time)
            if(!val.time){
                return filtered.notLate.push(val)
            }
            
            console.log("entrou")
            const timeVal = dayjs(val.time).utc()
            const dateWithTime = dateVal
                .hour(timeVal.hour())
                .minute(timeVal.minute())
                .second(timeVal.second())

            console.log(nowDate.toString())
            console.log(dateWithTime.toString())
            if(nowDate.isBefore(dateWithTime)){
                return filtered.notLate.push(val)
            }
        }
        console.log(val)

        return filtered.late.push(val)
    })


    return filtered
}

export async function getListTasks(id:string): Promise<TasksFiltered> {
    const API_URL = String(process.env.NEXT_PUBLIC_API_URL)
    const response = await fetch(`${API_URL}/${id}/tasks`)
    const data = await response.json()
    const dataFiltered = filterTasks(data)
    return dataFiltered
}