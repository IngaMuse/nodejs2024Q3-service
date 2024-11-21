# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker(Docker Desktop on Windows (WSL))
- WSL

## Downloading
- Download application by zip or by command
```
git clone https://github.com/IngaMuse/nodejs2024Q3-service.git
```
-Check Logging-Error-Handling-Authentication-Authorization branch by command
```
git checkout Containerization-Docker-Database-ORM
```
## Installing NPM modules

```
npm install
```
## Check and rename env

- Ports 4000 and 5432 are free
- Rename .env.example to .env
## Running application

Start docker developing server by command inside root directory(only Postgres)
```
docker-compose up -d
```
Apply prisma migrations & run application.
```
npm run migrate
npm run start:dev
``` 

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
