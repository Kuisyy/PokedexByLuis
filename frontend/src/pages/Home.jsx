import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import Spinner from "../components/Spinner";

const Home = () => {
  const { addToFav} = usePokemon();
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPokemons();

    }, []);

    const fetchPokemons = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if(!response.ok){
                throw new Error("Error del fetch a la API Pokemons");
            }
            const data = await response.json();

            // Ahora obtenemos toda la data de los pokemons en paralelo
            const pokemonData = await Promise.all(
                data.results.map( async (pokemon) =>{
                    const responsePokemon = await fetch(pokemon.url);
                    if(!responsePokemon.ok){
                        throw new Error("Error fetcheando la url del Pokemon");
                    }
                    return await responsePokemon.json();
 
                })
            );

            setPokemons(pokemonData);

        } catch (error) {
            console.error("Error fetching pokemons:",error);
        } finally {
            setIsLoading(false);
        }
    };


    if(isLoading){
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>
    }
    

    return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Pokemons disponibles</h1>
        {/* Grid de las tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta individual de cada Pokemon */}
        {
            pokemons.map(pokemon =>(
                <div key={pokemon.id} className="bg-white shado-md rounded-md p-6">
                    <div className="relative-group">
                        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className="w-32 h-32 mx-auto transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-center capitalize mt-2 ">{pokemon.name}</h2>

                    <div className="flex justify-center space-x-2 mt-4">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 "
                        onClick={()=> addToFav(pokemon)}
                        >Añadir favs
                        </button>

                        <Link to={`/search/${pokemon.name}`}  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-800"> 
                        Ver detalles 
                        </Link>

                    </div>
                </div>
            ))
        }

        </div>
    </div>
  )
}

export default Home;
