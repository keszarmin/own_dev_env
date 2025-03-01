import type { Route } from "./+types/register";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Development Environment" },
    { name: "Armin's development environment", content: "Hello Hello" },
  ];
}

export default function Name() {
  let navigate = useNavigate();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/password/${event.target.value}`)
    }
  }

    return (
  <main className="flex flex-col items-center justify-center w-screen h-screen bg-gray-950 text-gray-700">

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm text-gray-500 dark:text-gray-300">
          Name
        </label>
      </div>

      <div className="relative flex items-center mt-2">
        <input 
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="name"
          className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </div>
  </main>
    )
}