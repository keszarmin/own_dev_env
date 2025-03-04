import { useState,useRef } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/team";
import axios from "axios";
import ErrorWindowAlert from "./ErrorWindowAlert";

export async function loader({ params }: Route.LoaderArgs) {
    return {name : params.name}
}

export default function Password({
    loaderData,
}: Route.ComponentProps) {

    const [IsVisible, setIsVisible] = useState<string>("password");
    const [Password, setPassword] = useState<string>("");
    const [ErrWindowAlert, setErrWindowAlert] = useState<[boolean,string]>([false,"something went wrong"]);
    const InputRef = useRef<HTMLInputElement>(null);
    
    let navigate = useNavigate();



    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      
      if (event.key === "Enter") {
      if (Password === null || Password === "") setErrWindowAlert([true,"Fill in the password input!"]);
      else {
          axios.post("http://localhost:4000/login/",{
            username:loaderData.name,
            password:Password
          }).then((response) => {
            if (response.data === true) {
              navigate(`/main/${loaderData.name}`, { state: Password});
            } else {
              setErrWindowAlert([true,"This password is not matching one of passwords from our database!"]);
            }
          }).catch((err) => console.log(err));
      }}
    };

    return (
        <main className="flex flex-col items-center justify-center w-screen h-screen bg-gray-950 text-gray-700">

        <ErrorWindowAlert apear={ErrWindowAlert[0]} IN_data={ErrWindowAlert[1]} />

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm text-gray-500 dark:text-gray-300">
              Password
            </label>
          </div>

          <div className="relative flex items-center mt-2">
            <button
              onClick={() => {
                if (IsVisible == "password") setIsVisible("text") 
                else setIsVisible("password")
              }} className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <input 
              ref={InputRef}
              onKeyUp={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              type={IsVisible}
              placeholder="********"
              className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
      </main>
    )
}