import React,{useState,useEffect} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TimerCard({id,editable}:
    {id:number,editable:boolean}) 
{
    const {attributes,listeners,setNodeRef,transform,transition,active} = useSortable({id:id})
    const [IsEditAble, setIsEditAble] = useState<[string,string]>(["none","block"])
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const timerId = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);
  
    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
  
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: "all ease",
        cursor: active ? "grabbing" : "grab",
        display: IsEditAble[0]
    }
    const style2 = {
        transform: CSS.Transform.toString(transform),
        transition: "all ease",
        cursor: active ? "grabbing" : "grab",
        display: IsEditAble[1]
    }



    useEffect(() => {
        if (editable === true) setIsEditAble(["none","block"])
        else setIsEditAble(["block","none"])

    }, [editable])
    

    return (
        <>
        <div style={style} {...attributes} {...listeners} ref={setNodeRef} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
            <div style={{touchAction:"none"}} className="flex items-center justify-between">
                <div className="text-center grid place-content-center w-full h-full">
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(time)}
                    </div>
                </div>
            </div>
        </div>
        
        <div style={style2} {...attributes} {...listeners} ref={setNodeRef} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
            <div style={{touchAction:"none"}} className="flex items-center justify-between">
                <div className="text-center">
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {formatTime(time)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(time)}
                    </div>
                </div>   
            </div>
        </div>
        </>
    )
}