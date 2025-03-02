import React, {useEffect,useState} from "react";
import X_PNG from "./assets/X.png"

export default function AlertWindow({IN_data,apear}:{IN_data:string,apear:boolean}) {

    const [Apear, setApear] = useState<string>("none")

    useEffect(() => {
        
        if (apear === true) setApear("flex")
        else setApear("none")
    
    }, [apear])
    

    return (
    <div style={{display:Apear}} className="fixed bottom-5 left-[40%] w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-center w-12 bg-blue-500">
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-blue-500 dark:text-blue-400">Info</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{IN_data}</p>
        </div>
      </div>

      <div className="w-[30%] flex justify-end items-center">
        <button onClick={() => setApear("none")} className="text-lg font-medium text-blue-600 dark:text-blue-300"  role="link">
            <img width={30} src={X_PNG} alt="" />
          </button>
      </div>
    </div>
    )
}