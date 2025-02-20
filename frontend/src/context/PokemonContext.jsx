import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
const VITE_API_URL= import.meta.env.VITE_API_URL;
// Crear el contexto
const PokemonContext = createContext();

// Crear el provider del contexto
export const PokemonProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar los favoritos desde el backend
  useEffect(() => {
    fetchFavorites();
  }, [favourites]);

  // Función para obtener los favoritos desde el backend
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${VITE_API_URL}/favorites`);
      if (!response.ok) {
        throw new Error("Error al cargar los favoritos");
      }
      const data = await response.json();
      setFavourites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para añadir un Pokémon a favoritos
  const addToFav = async (pokemon) => {
    // Verificar si el Pokémon ya está en los favoritos
    if (favourites.some((p) => p.name === pokemon.name)) {
      toast.error("Pokemon ya en favs", {
        style: {
          background: "red",
          border: "1px solid black",
          color: "white",
        },
      });
      return; 
    }
  
    try {
      // Intentar añadir el Pokémon a favoritos
      const response = await fetch(`${VITE_API_URL}/favorites/${pokemon.name}`, {
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error("Error al añadir Pokémon a favoritos");
      }
  
      const addedPokemon = await response.json();
      setFavourites((prevFavourites) => [...prevFavourites, addedPokemon]);
  
      toast.success("Pokemon añadido a favoritos", {
        style: {
          background: "green",
          border: "1px solid black",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Error al añadir Pokémon a favoritos", {
        style: {
          background: "red",
          border: "1px solid black",
          color: "white",
        },
      });
    }
  };

  // Función para eliminar un Pokémon de favoritos
  const deleteToFav = async (pokemon) => {
    try {
      const response = await fetch(`${VITE_API_URL}/favorites/${pokemon.name}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar Pokémon de favoritos");
      }

      setFavourites((prevFavourites) =>
        prevFavourites.filter((pk) => pk.name !== pokemon.name)
      );

      toast.success("Pokemon eliminado de favoritos", {
        style: {
          background: "green",
          border: "1px solid black",
          color: "white",
        },
      });
    } catch (error) {
      console.error("Error deleting from favorites:", error);
    }
  };

  return (
    <PokemonContext.Provider value={{ favourites, addToFav, deleteToFav, isLoading }}>
      {children}
    </PokemonContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon debe ser usado dentro de un PokemonProvider");
  }
  return context;
};
