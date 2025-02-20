import React from "react";
import { useLoaderData } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";

const PokemonDetailPage = () => {
  const { addToFav,deleteToFav } = usePokemon();

  // Obtener los datos del loader
  const pokemon = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Título y nombre del Pokémon */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-40 w-40 object-contain"
          />
        </div>

        {/* Tipos de Pokémon */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Types</h2>
          <div className="flex gap-3">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-white text-sm font-medium bg-blue-500"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stats</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium text-gray-600">{stat.name}</span>
                <span className="font-medium text-gray-800">
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de Favorito */}
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-800"
          onClick={() => addToFav(pokemon)}
        >
          Añadir a favoritos
        </button>

      </div>
    </div>
  );
};

export default PokemonDetailPage;
