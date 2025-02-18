import { Router } from "express";
import { addFavs, deleteFavs, fetchAndSavePokemons, getFavorites, searchPokemon } from "../controllers/pokemonControllers.js";


const router = Router();

router.post("/start", fetchAndSavePokemons);

router.get("/details/:name", searchPokemon);

// Ruta para agregar un Pokémon a favoritos
router.post("/favorites/:name", addFavs);

// Ruta para eliminar un Pokémon de favoritos
router.delete("/favorites/:name", deleteFavs);

// Ruta para obtener todos los Pokémon favoritos
router.get("/favorites", getFavorites);

// router.get("/listPokemons", listPokemons);

export default router;
