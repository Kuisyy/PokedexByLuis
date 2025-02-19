import Pokemon from "../models/PokemonModels.js";  
import dotenv from "dotenv";
dotenv.config();

export const getPokemons = async () => {
  let allPokemons = [];
  let nextUrl = process.env.POKEAPI_URL; 
  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();

      // Obtener todos los detalles de los Pokémon en paralelo
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const responsePokemon = await fetch(pokemon.url);
          if (!responsePokemon.ok) {
            throw new Error(`Error al obtener detalles de ${pokemon.name}`);
          }

          const details = await responsePokemon.json();

          return {
            id: details.id,
            name: details.name,
            types: details.types.map((t) => t.type.name),
            stats: details.stats.map((s) => ({
              name: s.stat.name,
              base_stat: s.base_stat,
            })),
            image: details.sprites?.other?.dream_world?.front_default,
          };
        })
      );

      allPokemons = [...allPokemons, ...pokemonDetails];

      // Pasar a la siguiente página de la API
      nextUrl = data.next; // Si es null, el bucle se detiene
    }

    return allPokemons;
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    return [];
  }
};
export const savePokemonsToDB = async () => {
  try {
    const pokemons = await getPokemons(); 

    if (pokemons.length === 0) {
      console.log("No se encontraron Pokémon para guardar.");
      return;
    }

    
    await Promise.all(
      pokemons.map(async (pokemon) => {
        const { id, name, types, stats, image } = pokemon;
    
        // Verificamos si el Pokémon ya existe en la base de datos
        const existingPokemon = await Pokemon.findOne({ id });
    
        if (existingPokemon) {
          // Si el Pokémon ya existe, lo actualizamos (si es necesario)
          await Pokemon.updateOne(
            { id },
            {
              $set: {
                name,
                types,
                stats,
                image
              }
            }
          );
        } else {
          // Si no existe, lo insertamos como un nuevo documento
          const newPokemon = new Pokemon({
            id,
            name,
            types,
            stats,
            image
          });
          await newPokemon.save();
        }
      })
    );
    
    console.log("Todos los Pokémon han sido procesados.");
  } catch (error) {
    console.error("Error al guardar los Pokémon en la base de datos:", error);
  }
};

export const searchPokemonDB = async (name) => {
  try {
    const pokemon = await Pokemon.findOne({ name });
    return pokemon;
  } catch (error) {
    throw new Error("Error fetching Pokémon from the database");
  }
};

export const addFavsDB = async (name) => {
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { name: name },
      { $set: { isFavorite: true } },
      { new: true }
    );
    if (!updatedPokemon) {
      throw new Error("Pokemon no encontrado");
    }
    return updatedPokemon;
  } catch (error) {
    throw new Error("Error al marcar como favorito: " + error.message);
  }
};

export const deleteFavsDB = async (name) => {
  try {
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { name: name },
      { $set: { isFavorite: false } },
      { new: true }
    );
    if (!updatedPokemon) {
      throw new Error("Pokemon no encontrado");
    }
    return updatedPokemon;
  } catch (error) {
    throw new Error("Error al eliminar de favoritos: " + error.message);
  }
};

export const getFavoritePokemons = async () => {
  try {
    return await Pokemon.find({ isFavorite: true });
  } catch (error) {
    throw new Error("Error al obtener los Pokémon favoritos: " + error.message);
  }
};




// export const listPokemons = async () => {};

