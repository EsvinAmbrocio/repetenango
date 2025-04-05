# repetenango

Sitio para el seguimiento de hábitos

## Run Locally

### With Docker

#### Install dependencies

```bash
docker compose run --rm frontend npm install
docker compose run --rm backend npm install
```

#### Start the server

```bash
docker compose up
```

#### Configure environment variables

Create a `.env` file in the root directory and add the following variables for both backend and frontend:

```plaintext
# Backend environment variables
MONGO_URI=your_database_url
PORT=your_port_number
JWT_SECRET=your_secret
APP_URL_FRONTEND=your_app_frontend

# Frontend environment variables
NEXT_PUBLIC_APP_URL_API=your_api_url
```

Replace `your_database_url`, `your_port_number`, `your_secret`, `your_app_frontend` and `your_api_url` with your actual database URL, port number, and API URL respectively.

### Without Docker

#### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `backend` directory and add the following variables:
    ```plaintext
    MONGO_URI=your_database_url
    PORT=your_port_number
    JWT_SECRET=your_secret
    APP_URL_FRONTEND=your_app_frontend
    ```
4. Start the backend server:
    ```bash
    npm start
    ```

#### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the `frontend` directory and add the following variable:
    ```plaintext
    NEXT_PUBLIC_APP_URL_API=your_api_url
    ```
4. Start the frontend server:
    ```bash
    npm run dev
    ```

### Deploy on Vercel with CLI

#### Prerequisites

1. Install the Vercel CLI globally:
    ```bash
    npm install -g vercel
    ```
2. Log in to your Vercel account:
    ```bash
    vercel login
    ```

#### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Deploy the project using the Vercel CLI:
    ```bash
    vercel
    ```
3. During the deployment process, you will be prompted to configure the project. Provide the necessary details:
    - Project name
    - Link to an existing Vercel project (if applicable)
    - Environment variables (e.g., `NEXT_PUBLIC_APP_URL_API=your_api_url`)
4. Once the deployment is complete, Vercel will provide a live URL for your application.

#### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Deploy the backend using the Vercel CLI:
    ```bash
    vercel --prod
    ```
3. During the deployment process, provide the necessary details:
    - Project name
    - Link to an existing Vercel project (if applicable)
    - Environment variables (e.g., `MONGO_URI=your_database_url`, `PORT=your_port_number`, `JWT_SECRET=your_secret`, `APP_URL_FRONTEND=your_app_frontend`)
4. Once the deployment is complete, Vercel will provide a live URL for your backend.

Note: Ensure that the backend is configured to work as a serverless function, as Vercel primarily supports serverless deployments.


