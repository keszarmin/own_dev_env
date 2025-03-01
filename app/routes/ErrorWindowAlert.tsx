import React,{useState,useEffect} from 'react'

export default function ErrorWindowAlert({IN_data,apear}: {
    IN_data : string,
    apear: boolean,
}) {
    const [Display, setDisplay] = useState<string>("none");
    const [Data, setData] = useState<string>("Something went wrong!")

    useEffect(() => {
        setData(IN_data);
        if (apear === true) setDisplay("flex");
    }, [apear,IN_data])

    return (
      <div style={{display:Display}} className="fixed flex items-center justify-between max-w-4xl p-4 mx-auto bg-white border border-gray-200 shadow-md dark:bg-gray-900 left-12 bottom-16 dark:shadow-gray-900 shadow-gray-100 md:gap-x-4 dark:border-gray-700 rounded-2xl">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {Data}
        </p>
        <button onClick={() => setDisplay("none")} className="flex items-center justify-center text-gray-700 transition-colors duration-300 rounded-full shrink-0 dark:text-gray-200 dark:hover:bg-gray-700 w-7 h-7 focus:outline-none hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>       
    )
}