# repetenango

Sitio para el seguimiento de habitos


## Run Locally

Install dependencies

```bash
docker run --rm --interactive --tty -w /app -u node --volume ${PWD}:/app node:22.14-alpine npm install
```

Start the server

```bash
docker run --rm --interactive --publish 3000:3000 --tty -w /app -u node --volume ${PWD}:/app node:22.14-alpine npm run start
```
