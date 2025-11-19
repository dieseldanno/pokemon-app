import { useState } from "react";
import PokemonApplication from "./components/PokemonApplication";

export default function App() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#FF0000] via-[#3B4CCA] to-[#FFDE00] flex flex-col gap-6 items-center justify-center relative overflow-hidden">
        {/* pokéball btn */}
        <button
          onClick={() => setShowApp(true)}
          className="relative group w-80 h-80 rounded-full overflow-hidden border-16 border-gray-900 shadow-2xl 
               transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95 
               cursor-pointer z-10"
        >
          {/* red upper half */}
          <div className="absolute inset-0 bg-linear-to-b from-red-600 to-red-700"></div>

          {/* white lower half */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>

          {/* black middle line */}
          <div className="absolute top-1/2 left-0 right-0 h-12 bg-gray-900 transform -translate-y-1/2"></div>

          {/* white middle with black border */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-32 h-32 bg-white rounded-full border-10 border-gray-900 shadow-2xl"
          ></div>

          {/* inner glowing light */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-20 h-20 bg-linear-to-br from-gray-100 to-white rounded-full 
                    border-4 border-gray-700 shadow-inner
                    transition-all duration-300 group-hover:from-white group-hover:to-yellow-200 
                    group-hover:shadow-glow"
          ></div>
        </button>
        <p className="text-2xl">Start app by clicking Poké Ball</p>
      </div>
    );
  }

  return <PokemonApplication />;
}
