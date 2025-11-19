interface PokemonProps {
  details: {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    weight: number;
    height: number;
  };
}

export default function Pokemon({ details }: PokemonProps) {
  const capitalizedName =
    details.name.charAt(0).toUpperCase() + details.name.slice(1);
  const types = details.types
    .map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
    .join(" · ");
  const weightKg = (details.weight / 10).toFixed(1);
  const heightM = (details.height / 10).toFixed(1);

  return (
    <div className="mt-12 bg-linear-to-br from-[#FF0000] to-[#3B4CCA] rounded-3xl p-10 shadow-2xl text-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={details.sprites.front_default || "/pokeball.png"}
          alt={details.name}
          className="w-80 h-80 object-contain drop-shadow-2xl bg-white/20 rounded-full p-8"
        />

        <div className="text-center md:text-left">
          <h2 className="text-5xl font-bold mb-4">{capitalizedName}</h2>
          <p className="text-2xl mb-6 opacity-90">
            #{String(details.id).padStart(3, "0")}
          </p>

          <div className="space-y-4 text-xl">
            <p>
              <span className="font-semibold">Type:</span>{" "}
              <span className="text-yellow-300">{types}</span>
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {weightKg} kg
            </p>
            <p>
              <span className="font-semibold">Height:</span> {heightM} m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
