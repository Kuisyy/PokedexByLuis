import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

dotenv.config();

const app = express();

// Conectar con la base de datos MongoDB antes de iniciar el servidor
connectDB();

// Middleware
app.use(express.json()); // Permitir JSON en las peticiones
app.use(cors()); // Habilitar CORS

// Rutas de la API
app.use('/api', pokemonRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
