import React from "react"

export default function DropdownItem({type,set}:{type:string,set:React.Dispatch<React.SetStateAction<string | undefined>>}) {
    return (
        <button onClick={() => set(type)} className="w-auto whitespace-nowrap flex justify-center items-center rounded-lg px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            {type}
        </button>
    )
}