import React,{useState,useEffect} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function WorldCard({id,name,type,description,data,username,password,editable}:
    {id:number,name:string,type:string,description:string,data:string,username:string,password:string,editable:boolean}) 
{
    const {attributes,listeners,setNodeRef,transform,transition,active} = useSortable({id:id})
    const [IsEditAble, setIsEditAble] = useState<[string,string]>(["none","block"])
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

    }, [IsEditAble])
    

    return (
        <>
        <div style={style} {...attributes} {...listeners} ref={setNodeRef} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div style={{touchAction:"none"}} className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-800 dark:text-gray-400">{name}</span>
                <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">{type}</span>
                </div>
        
                <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{description}</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                        {data}
                    </p>
                </p>
                </div>
    
                <div>
            </div>
        </div>
        
        <div style={style2} {...attributes} {...listeners} ref={setNodeRef} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div style={{touchAction:"none"}} className="flex items-center justify-between">
                <input className="text-sm font-light text-gray-800 dark:text-gray-400" value={name} />
                <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">{type}</span>
                </div>
        
                <div>
                <input className="mt-2 text-lg font-semibold text-gray-800 dark:text-white" value={description} />
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <textarea placeholder="lorem..." className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">
                        {data}
                    </textarea>
                </p>
            </div>
        </div>
        </>
    )
}