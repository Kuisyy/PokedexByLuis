# Usamos una imagen base de Node.js
FROM node:18

# Crear y definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código al contenedor
COPY . .

# Exponer el puerto en el que tu app escucha
EXPOSE 5000

# Definir el comando para iniciar el servidor
CMD ["npm", "start"]
