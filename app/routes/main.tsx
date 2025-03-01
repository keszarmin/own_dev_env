import React, { useEffect, useState } from 'react'
import type { Route } from "./+types/team";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router';
import ErrorWindowAlert from './ErrorWindowAlert';
import { closestCorners, DndContext,PointerSensor, rectIntersection, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EDITPNG from "./assets/edit.png"
import PLUSPNG from "./assets/plus.png"
import WorldCard from "./CardTypes/WorldCard";

export async function loader({ params }: Route.LoaderArgs) {
    return {name : params.name}
}

export default function Main({
    loaderData,
}: Route.ComponentProps) {
    
    const Location = useLocation();
    let navigate = useNavigate();
    
    interface Model {
        name: string;
        description: string;
        type: string;
        id: number;
        data: string;
    }
    
    const [ModelData, setModelData] = useState<Model[]>([]);
    const Password:string = Location.state;
    const [ErrWindowAlert, setErrWindowAlert] = useState<[boolean,string]>([false,"something went wrong"]);
    const [IsEditAble, setIsEditAble] = useState<boolean>(false)
    
    function checkLogIn():void {

        axios.post("http://localhost:4000/login",{
            username:loaderData.name,
            password:Password,
        }).then((response) => {
            if (response.data === false) {
                navigate("/")
            } else GetAllRows();
        })
    }

    function GetAllRows():void {

        axios.post(`http://localhost:4000/api/${loaderData}/${Password}`).then((response) => 
        {
            const res_data = response.data;
            if (res_data != "Error in User details" && res_data != null) {
                setModelData(res_data);
            } else setErrWindowAlert([true,"Something went wrong in fetching your models"])
        })
    }

    useEffect(() => {
        checkLogIn()
        window.addEventListener("beforeunload",() => {
            Location.state = null;
        })
        
        return window.removeEventListener("beforeunload",() => Location.state = null);
    }, [Location])

    const getPosition = (id: number) => {
        return ModelData.findIndex((model) => model.id === id);
    }

    const handleDragEnd = (event: any) => {
        const {active,over} = event;

        if (active.id === over.id) return;

        setModelData(() => {
            const originalPosition = getPosition(active.id)
            const latestPosition = getPosition(over.id)

            return arrayMove(ModelData, originalPosition,latestPosition)
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        }),
        useSensor(TouchSensor)
    )

    return (
        <div className='w-screen h-screen'>
        
        <ErrorWindowAlert apear={ErrWindowAlert[0]} IN_data={ErrWindowAlert[1]} />

        <div className='w-full h-[7%] flex justify-center items-center'>
        <input
            type="text"
            className="w-[30%] focus:h-[60%] duration-150 h-[40%] py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Search"
        />
        </div>

        <div className='grid-cols-2 grid p-[2%]'>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={ModelData} strategy={rectSortingStrategy}>
                    {
                        ModelData.map((data,key) => {
                            
                            switch (data.type) {
                                case "world":
                                    return (
                                        <WorldCard editable={IsEditAble} id={data.id} name={data.name} data={data.data} username={loaderData.name} password={Password} type={data.type} key={key} description={data.description} />
                                    )
                            }
                        })
                    }
                </SortableContext>
            </DndContext>
        </div>

        <button onClick={() => IsEditAble? setIsEditAble(false) : setIsEditAble(true)} className="px-6 py-2 font-medium w-max rounded-full tracking-wide absolute bottom-[2%] right-[1%] text-white capitalize transition-colors duration-300 transform bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-80">
            <img className='w-[50px]' src={EDITPNG} alt='edit png' />
        </button>
        <button onClick={() => IsEditAble? setIsEditAble(false) : setIsEditAble(true)} className="px-6 py-2 font-medium w-max rounded-full tracking-wide absolute bottom-[2%] left-[1%] text-white capitalize transition-colors duration-300 transform bg-blue-600  hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-80">
            <img className='w-[50px]' src={PLUSPNG} alt='edit png' />
        </button>
        </div>
    );
}