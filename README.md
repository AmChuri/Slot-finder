# Enpal Coding Challenge

This project is a Node.js application with a PostgreSQL database, containerized using Docker and Docker Compose.

## Prerequisites

Make sure you have the following installed on your system:

- Docker
- Docker Compose
- Node.js and npm (for local development)

## Running the Application with Docker Compose

To build and start the entire application using Docker Compose, run the following command:

```bash
docker-compose up --build
```

## Running the PostgreSQL Database Container Separately

If you prefer to run the database container separately, you can follow these steps:

1. Navigate to the `database` directory:

    ```bash
    cd database
    ```

2. Build the PostgreSQL Docker image:

    ```bash
    docker build -t enpal-coding-challenge-db .
    ```

3. Run the PostgreSQL container:

    ```bash
    docker run --name enpal-coding-challenge-db -p 5432:5432 -d enpal-coding-challenge-db
    ```

This will run the PostgreSQL container in the background and expose it on port `5432`.

---

## Running the Tests (Node.js Application)

To run the tests for the Node.js application after starting the PostgreSQL database, follow these steps:

1. Navigate to the `test-app` directory:

    ```bash
    cd test-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```
3. Start the Node.js server:

    ```bash
    npm start
    ```

The server will now be running on `http://localhost:3000/` and making `POST` Request on `http://localhost:3000/calendar/query` and will communicate with the PostgreSQL database.

### Accepted Query Format

The following type of query is accepted by the application:

```json
{
  "date": "2024-05-04",
  "products": ["Heatpumps","SolarPanels"],
  "language": "English",
  "rating": "Silver"
}
```

4. Run the tests in new terminal:

    ```bash
    npm test
    ```

The tests will now run, and you'll see the output of your tests in the terminal.

## Note
`.env` file is included in the project for simplification. 

When both services are when started in docker-compose communicate using private network
