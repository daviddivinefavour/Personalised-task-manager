# Task Manager API Service

## Description

API service for task manager

## Acquisition and setup

```bash
$ git clone https://github.com/daviddivinefavour/task-manager.git
$ cd task-manager
$ yarn install
```

Set up environment variables, by renaming the example env file and filling up with the correct details.

```bash
$ mv .env.example .env && nano .env
```

Set up spin up the database - Postgres.

```bash
$ yarn db:create
$ yarn db:migrate
```

Build the application.

```bash
$ yarn build
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Usage

After app spin up either on <strong>development</strong> mode, you can make calls to the server from the [documentation](http://localhost:3500/api/v1/docs) (on an assumption that you had set your NODE_ENV=3500). <br>
You can also access the web client for realtime data from the [host](http://localhost:3500)

## Authors Contact Information

- Author - Divinefavour David
- Twitter - [@Divinefavour_DC](https://twitter.com/Divinefavour_DC)
- LinkedIn - [divinefavour-david](https://www.linkedin.com/in/divinefavour-david/)
- Gmail - [divinefavour.c.david@gmail.com](mailto:divinefavour.c.david@gmail.com)

Please note:
* This documentation assumes you have Postgres server,node.js, Git and Yarn package manager installed on your host computer.

