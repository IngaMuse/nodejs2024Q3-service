# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker(Docker Desktop on Windows (WSL))
- WSL

## Docker hub posting
```
https://hub.docker.com/r/ingamo/nodejs2024q3-service-app/tags
```
## Downloading
- Download application by zip or by command
```
git clone https://github.com/IngaMuse/nodejs2024Q3-service.git
```
-Check Containerization-Docker-Database-ORM branch by command
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

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running vurnelabilities test
```
npm run scan
```
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
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
