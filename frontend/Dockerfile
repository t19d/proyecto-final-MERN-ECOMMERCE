FROM node:14.13.1-alpine3.10
WORKDIR '/app'

COPY package.json .
RUN npm install
# Para limpiar los antiguos
RUN npm clean-install
COPY . .
CMD [ "npm", "start" ]
