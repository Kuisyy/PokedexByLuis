import mongoose from 'mongoose';

// Esquema de stats 
const statSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Nombre de la estadística, como "hp", "attack", etc.
  base_stat: { type: Number, required: true }  // Valor base de la estadística
});

// Esquema de pokemon
const pokemonSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true }, 
    name: { type: String, required: true, unique: true },  
    types: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.every(type => typeof type === 'string');
        },
        message: 'Los tipos deben ser cadenas de texto.'
      }
    },
    stats: {
      type: [statSchema],
      required: true,
      validate: {
        validator: function (value) {
          return value.every(stat => stat.name && stat.base_stat);
        },
        message: 'Cada estadística debe tener un nombre y un valor base.'
      }
    },
    image: { type: String, required: false },
    isFavorite: { type: Boolean, default: false },  
  },
  { timestamps: true }
);

// Crear el modelo a partir del esquema
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;