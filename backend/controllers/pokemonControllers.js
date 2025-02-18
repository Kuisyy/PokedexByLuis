import { addFavsDB, deleteFavsDB, getFavoritePokemons, getPokemons, searchPokemonDB } from "../services/pokeApiService.js"; 
import { savePokemonsToDB } from "../services/pokeApiService.js"; 

// Controlador para obtener los Pokémon y guardarlos en MongoDB
export const fetchAndSavePokemons = async (req, res) => {
  try {
    const pokemons = await getPokemons();

    if (pokemons.length === 0) {
      return res.status(404).json({ message: "No se encontraron Pokémon para guardar." });
    }

    await savePokemonsToDB(pokemons);

    res.status(200).json({ message: "Pokémon guardados exitosamente en MongoDB." });

  } catch (error) {
    console.error("Error al obtener o guardar los Pokémon:", error);
    res.status(500).json({ message: "Hubo un error al procesar los Pokémon." });
  }
};

export const addFavs = async (req, res) => {
  const { name } = req.params;
  try {
    const updatedPokemon = await addFavsDB(name);
    res.status(200).json("Pokemon añadido a favs correctamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un Pokémon de favoritos
export const deleteFavs = async (req, res) => {
  const { name } = req.params;
  try {
    const updatedPokemon = await deleteFavsDB(name);
    res.status(200).json("Pokemon eliminado de favoritos correctamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los Pokémon favoritos
export const getFavorites = async (req, res) => {
  try {
    const favoritePokemons = await getFavoritePokemons();
    res.status(200).json(favoritePokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPokemon = async (req, res) => {
  const { name } = req.params; 
  try {
    const pokemon = await searchPokemonDB(name); 

    if (pokemon) {
      return res.status(200).json(pokemon);
    } else {
      return res.status(404).json({ message: `Pokémon con el nombre ${name} no encontrado.` });
    }
  } catch (error) {
    // En caso de error, devolvemos una respuesta de error
    console.error("Error al obtener el Pokémon:", error.message);
    return res.status(500).json({ message: error.message });
  }
};





