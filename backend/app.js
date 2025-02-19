import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import { fetchAndSavePokemons } from './controllers/pokemonControllers.js';


dotenv.config();

const app = express();

const startServer = async () => {
  try {
    // Conectar con la base de datos MongoDB
    await connectDB();

    // Cargar los Pokémon en la base de datos
    await fetchAndSavePokemons();
    console.log('Pokémon iniciales cargados en la base de datos');

    // Middleware
    app.use(express.json()); // Permitir JSON en las peticiones
    app.use(cors()); // Habilitar CORS

    // Rutas de la API
    app.use('/api', pokemonRoutes);

    // Middleware de manejo de errores
    app.use((err, req, res, next) => {
      res.status(500).json({ message: 'Algo salió mal!' });
    });

    const PORT = process.env.PORT || 5000;

    // Arrancar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error en la inicialización del servidor:', error);
  }
};

startServer();
