# Niyo Task Manager API Service

## Description

API service for the Niyo task manager

## Acquisition and setup

```bash
$ git clone https://github.com/daviddivinefavour/Personalised-task-manager.git
$ cd Personalised-task-manager
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
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Usage

<p>After app spin up either on <strong>development</strong> mode or <strong>staging</strong>, you can make calls to the server from the [documentation](http://localhost:3500/api/v1/docs) (on an assumption that you had set your NODE_ENV=3500).</p>
<p>You can also access the web client for realtime data from the [host](http://localhost:3500)</p>

## Authors Contact Information

- Author - Divinefavour David
- Twitter - [@Divinefavour_DC](https://twitter.com/Divinefavour_DC)
- LinkedIn - [divinefavour-david](https://www.linkedin.com/in/divinefavour-david/)
- Gmail - [divinefavour.c.david@gmail.com](mailto:divinefavour.c.david@gmail.com)
