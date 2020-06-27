FROM node:12.2.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 8000
CMD [ "node", "server.js" ]
