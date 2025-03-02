import axios from "axios";
import {type IUserModel,type IModel,Types} from "../interface/Model";
import { useState,useEffect } from "react";
import ErrorWindowAlert from "../ErrorWindowAlert";
import TimerCard from "../CardTypes/TimerCard";
import DropdownItem from "./DropDownItem";
import WorldCard from "../CardTypes/WorldCard";
import X_PNG from "../assets/X.png"

export default function Add({Model,apear}:{Model:IUserModel,apear:boolean}) {

    const [Verify, setVerify] = useState<boolean>(false);
    const [Datas, setDatas] = useState<IModel>();
    const [ErrWindowAlert, setErrWindowAlert] = useState<[boolean,string]>([false,"Something went wrong"]);
    const [Apear, setApear] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [FocusedCardType, setFocusedCardType] = useState<string | undefined>();

    const AddModule = async() => {
        axios.post("http://localhost:4000/api",{
            username:Model.username,
            password:Model.password,
            name:Datas?.name,
            type:Datas?.type,
            descripton:Datas?.description,
            data:Datas?.data
        }).then((response) => {
            if (response.data === "Succesfully added!") {
                setVerify(true);
            } else {
                if (response.data === "Error in Save to DB") setErrWindowAlert([true,"Error in saving to the database!"]);
                else setErrWindowAlert([true,"Something went wrong!"]);
            }
        })
    }

    useEffect(() => {
        if (apear === true) setApear("flex")
        else setApear("none")
    }, [apear])

    const [ShownCard, setShownCard] = useState<React.ReactNode>(<TimerCard id={0} editable={true}/>)

    useEffect(() => {
      
        switch (FocusedCardType) {
            case "world":
                setShownCard(<WorldCard Data={{name:"Name",type:"type",description:"description",data:"data",id:0}} editable={true} />)
                break;
        
            case "timer":
                setShownCard(<TimerCard id={0} editable={false} />)
                break;
            default:
                break;
        }
        
    }, [FocusedCardType])
    

    return (
        <div style={{display:Apear}} className="w-screen z-10 h-screen fixed inset-0 bg-opacity-50 backdrop-blur-md items-center justify-center">

        <div className="w-full max-w-md px-8 py-4 mt-16 rounded-lg shadow-lg bg-gray-900">
           <div className="relative inline-block w-full h-full">
            
            <div className="w-full h-[40%] flex justify-between items-center p-5">
                <button onClick={() => setIsOpen(!isOpen)} className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:ring-opacity-40 dark:focus:ring-opacity-40 hover:bg-gray-700 dark:bg-gray-800 focus:outline-none">
                    <p>Types</p>
                </button>
                <h1 className="text-2xl">Add new model</h1>
            </div>

           
            <div className="w-full flex justify-basaline">
                {isOpen && (
                    <div
                    className="absolute ring-2 inline-flex z-20 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                    >
                        {Types.map((data,key) => (
                            <DropdownItem set={setFocusedCardType} type={data} key={key} />
                        ))}
                    </div>
                )}
            </div>

            {ShownCard}

            </div>
  
        <div className="flex justify-between mt-4">
          <button onClick={() => setApear("none")} className="text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex={0} role="link">
            <img width={30} src={X_PNG} alt="" />
          </button>
          <button className="text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex={0} role="link">
            Add
          </button>
        </div>
      </div>
    </div>
    )
}