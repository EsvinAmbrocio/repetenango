# repetenango

Sitio para el seguimiento de hábitos

## Run Locally

### Install dependencies

```bash
docker compose run --rm frontend npm install
docker compose run --rm backend npm install
```

### Start the server

```bash
docker compose up
```

### Configure environment variables

Create a `.env` file in the root directory and add the following variables for both backend and frontend:

```plaintext
# Backend environment variables
MONGO_URI=your_database_url
PORT=your_port_number

# Frontend environment variables
NEXT_PUBLIC_APP_URL_API=your_api_url
```

Replace `your_database_url`, `your_port_number`, and `your_api_url` with your actual database URL, port number, and API URL respectively.

### Levantar la aplicación

```bash
docker compose up
```
