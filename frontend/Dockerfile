FROM node:14.13.1-alpine3.10
RUN mkdir /app
WORKDIR '/app'
COPY package.json .
RUN npm install
# Para limpiar los antiguos
RUN npm clean-install
COPY . .
# Abrir el puerto para poder conectarse desde fuera
EXPOSE 3000/tcp
CMD [ "npm", "start" ]
# Comandos para cmd
# cd /frontend
# docker build -t frontend .
# docker run -d -it -p 3000:3000/tcp --name frontend frontend