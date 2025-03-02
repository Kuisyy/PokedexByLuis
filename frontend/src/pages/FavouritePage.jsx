import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import { ROUTES } from "../routes/paths";


const FavouritePage = () => {
  const { favourites, deleteToFav } = usePokemon(); 

  if (favourites.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Tus Pokémon Favoritos</h2>
        <p className="text-gray-700 mb-4">
          No tienes Pokémon favoritos actualmente.
        </p>
        <Link
          to={ROUTES.HOME}
          className="text-blue-600 hover:underline"
        >
          Volver a la página de inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Tus Pokémon Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg shadow-lg p-4 text-center"
          >
            <img
              src={pokemon.image || pokemon.sprites.other.dream_world.front_default} // Verifica la propiedad image
              alt={pokemon.name}
              className="h-32 w-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
            <button
              onClick={() => deleteToFav(pokemon)} // Usamos el método del contexto para eliminar de favoritos
              className="mt-4  bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Eliminar
            </button>

            <Link
                to={`/details/${pokemon.name}`} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Ver detalles
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouritePage;
