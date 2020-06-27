# A11yTool

This project is a A11Y-App created with Docker Containers. There are five diffrent Containers connected with a Docker-Compose File to start the App with only one terminal command.

The five containers are:

1. [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.
2. [Node.js/Check-Script](https://hub.docker.com/_/node?tab=description) version 12.2.0.
3. [Node.js/API-Server](https://hub.docker.com/_/node?tab=description) version 12.2.0.
4. [MySQL](https://hub.docker.com/_/mysql) version 5.7.
5. [PhpMyAdmin](https://www.github.com/phpmyadmin/docker) version 5.0.2.


Before you can start you must [install Docker](https://docs.docker.com/get-docker/).

## Over this App

The App is only a prototype to test how to build a Accessibility Tool wich can automatically test websites on accessbility barriers.

**You have two modes to run the App:**

### As a Development Server

Run `sudo docker-compose -f docker-compose.yml up -d --build` for a dev server. 
Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

### As a Production Server

If you want you can use this Dockercompose File for your Productionmode. With a builded Angular App and nginx-Server to display.
Run `sudo docker-compose -f docker-compose-prod.yml up -d --build` for production mode.

After building and run containers you can navigate to Navigate to `http://localhost:80/` and the App is running.
