FROM node:14.13.1-alpine3.10
RUN mkdir /api
WORKDIR '/api'
COPY package.json .
COPY package-lock.json .
RUN npm install
# Para limpiar los antiguos
# RUN npm clean-install
COPY . .
# Abrir el puerto para poder conectarse desde fuera
EXPOSE 4000/tcp
CMD [ "npm", "start" ]
# Comandos para cmd
# docker build -t backend .
# docker run -d -it -p 4000:4000/tcp --name backend backend