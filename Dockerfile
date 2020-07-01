# SECTION Dockerfile for App DEV Mode

# NOTE install node
FROM node:12.2.0 as build

# NOTE set working directory
WORKDIR /app

# NOTE include new path
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

# NOTE install package.json components and angular cli
RUN npm install
RUN npm install -g @angular/cli@9.1.8

COPY . /app

# NOTE start app
CMD ng serve --host 0.0.0.0

# !SECTION
