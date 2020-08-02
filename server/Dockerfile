## SECTION

## NOTE Load Node
FROM node:12.2.0

## NOTE Make a directory
RUN mkdir -p /app

## NOTE go to directory
WORKDIR /app

## NOTE Copy all required files
COPY package.json /app
COPY . /app

## NOTE Run Node Packeage Manager
RUN npm install

COPY . .

## Port 8000 for the server
EXPOSE 8000

## Run with Node the server.js file
CMD [ "node", "server.js" ]

## !SECTION
