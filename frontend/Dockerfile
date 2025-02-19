# Etapa de construcción de React
FROM node:18 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias (package.json y package-lock.json)
COPY package*.json ./ 

# Instalar las dependencias de la aplicación React
RUN npm install

# Copiar todo el código fuente de la aplicación React
COPY . .

# Crear la versión optimizada para producción de la aplicación
RUN npm run build

# Etapa de ejecución con Nginx
FROM nginx:alpine

# Copiar los archivos generados por la etapa de construcción al directorio de Nginx
# Cambiar /app/build por /app/dist, que es donde se encuentran los archivos generados
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Comando para iniciar Nginx (se ejecuta automáticamente)
CMD ["nginx", "-g", "daemon off;"]
