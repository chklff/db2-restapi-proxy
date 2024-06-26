# DB2 REST Proxy

## Overview

DB2 REST Proxy is a Node.js application providing a RESTful API interface for interacting with an IBM DB2 database. It allows for executing SQL queries directly via HTTP requests.

## Features

- Execute SQL queries via REST API endpoints.
- Retrieve detailed information about query execution, including record sets, rows affected, and more.
- Support for a wide range of SQL operations: SELECT, INSERT, UPDATE, DELETE.

## Prerequisites

- Node.js (Version 16 or later)
- IBM DB2 (Version X or later)
- Access to modify environment variables for secure credential storage.

## Installation

### Clone the Repository

```bash
git clone [your-repo-url]
cd [your-repo-directory]
```

### Setting Up Environment Variables

Create a `.env` file in the root directory with the following content:

```plaintext
DB_USER=yourDatabaseUsername
DB_PASSWORD=yourDatabasePassword
DB_SERVER=yourDatabaseServer
DB_DATABASE=yourDatabaseName
DB_PORT=yourDatabasePort
PORT=applicationPort
```

### Install Dependencies

```bash
npm install
```

## Usage

### Running the Application


#### With Node.js

If you prefer to start the server manually using Node.js, run:

```bash
npm start
```

This will launch the DB2 REST Proxy at `http://localhost:5478`.

## API Endpoints

### Test Database Connection

- **Endpoint:** `/test-db`
- **Method:** GET
- **Description:** Tests the connection to the database and returns a list of available tables.

```bash
curl --location --request GET 'http://yourserver:5478/test-db'
```

### Execute Query

- **Endpoint:** `/query`
- **Method:** POST
- **Body:** `{ "sql": "your SQL query here" }`
- **Content-Type:** application/json
- **Description:** Executes the provided SQL query and returns the result.

```bash
curl --location --request POST 'http://yourserver:5478/query' --header 'Content-Type: application/json' --data-raw '{
  "sql": "SELECT * FROM your_table;"
}'
```

## Security and Best Practices

- Never expose sensitive database credentials.
- Use environment variables for configuration.
- Employ parameterized queries to prevent SQL injection.
- This API should be used in a secure environment, as it can execute arbitrary SQL queries.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request.
