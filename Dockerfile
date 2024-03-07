FROM node:20.11.1

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos del paquete y su bloqueo
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3008

# Comando para iniciar la aplicación
CMD ["node", "server.js"]