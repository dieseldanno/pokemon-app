import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
}

export default function PokemonApplication() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch list of pokemon
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        if (!response.ok) throw new Error("Could not fetch Pokémon list");
        const data = await response.json();
        setPokemonList(data.results);
        setLoadingList(false);
      } catch (err) {
        setError(
          "Something went wrong while fetching the Pokémon list. " +
            (err as Error).message
        );
      }
    };

    fetchPokemonList();
  }, []);

  //get details for selected pokemon
  const handleFetchPokemon = async () => {
    if (!selectedName) return;
    setLoadingDetails(true);
    setError(null);

    try {
      const selected = pokemonList.find((poke) => poke.name === selectedName);
      if (!selected) throw new Error("Selected Pokémon not found in the list");

      const response = await fetch(selected.url);
      if (!response.ok) throw new Error("Could not fetch Pokémon details");

      const data: PokemonDetails = await response.json();
      setPokemonDetails(data);
    } catch (err) {
      setError(
        "Something went wrong while fetching the Pokémon details. " +
          (err as Error).message
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FF0000] via-[#3B4CCA] to-[#FFDE00] py-4 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center text-white mb-12 drop-shadow-lg">
          Pokémon Gen 1
        </h1>

        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 ">
            <div className="flex-1">
              <label className="block text-xl font-semibold text-gray-800 mb-3">
                Choose your Pokémon
              </label>

              {loadingList ? (
                <div className="px-6 py-4 bg-gray-200 rounded-xl animate-pulse">
                  Loading Pokémon...
                </div>
              ) : (
                <select
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition"
                >
                  <option value="">-- Choose a Pokémon --</option>
                  {pokemonList.map((poke) => (
                    <option key={poke.name} value={poke.name}>
                      {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={handleFetchPokemon}
              disabled={!selectedName || loadingDetails}
              className="px-10 py-5 bg-linear-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {loadingDetails ? "Laddar..." : "Visa Pokémon"}
            </button>
          </div>

          {/* error msg */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {/* show chosen pokemon */}
          {pokemonDetails && <Pokemon details={pokemonDetails} />}
        </div>
      </div>
    </div>
  );
}
