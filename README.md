---

# Finance Management API

Finance Management API is a backend service designed to handle financial transactions, user authentication, and transaction summaries. It provides a robust platform for managing personal finances efficiently.

## Features

- **User Authentication:** Register new users and authenticate existing users using JWT (JSON Web Tokens).
- **Transaction Management:** Add, retrieve, and delete financial transactions for authenticated users.
- **Transaction Summary:** Retrieve a summary of transactions for a given period, including total income, total expenses, and savings.

## Dependencies

- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **MySQL:** MySQL database driver for Node.js.
- **bcrypt:** Library to hash and compare passwords securely.
- **jsonwebtoken:** Implementation of JSON Web Tokens for authentication.
- **Jest:** JavaScript Testing Framework with a focus on simplicity.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/sagardubey14/finance-management-api.git
   ```

2. Install dependencies:
   ```
   cd finance-management-api
   npm install
   ```

3. Set up the database:
   - Ensure you have MySQL installed, preferably using a tool like XAMPP.
   - This repository contains a MySQL database file `finance_api.sql` located in the `database` folder.
   - Import the finance_api.sql file into your MySQL server to create the database structure and populate it with initial data.
   - Update the database configuration in `config/config.js` with your database credentials.

4. Start the server:
   ```
   npm start
   ```
## Testing

The project uses Jest as its testing framework. Jest provides a simple and easy-to-use interface for writing and running tests.

To run the tests:

Run tests individually:

   - **User Authentication Tests:**
     ```
     npm test authRoutes.test.js
     ```

   - **Transaction Management Tests:**
     ```
     npm test transactionsRoutes.test.js
     ```

   - **Input Validation Tests:**
     ```
     npm test invalidInput.test.js
     ```

Each command will execute the corresponding test suite and provide the results, including any failing tests and coverage information.

---

---

## User Authentication API Documentation

### Register a New User

Registers a new user with the provided details.

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:**
  - `Name` (string, required): The name of the user.
  - `Email` (string, required): The email address of the user.
  - `Password` (string, required): The password for the user account.

#### Example Request:

```json
{
  "Name": "John Doe",
  "Email": "johndoe@example.com",
  "Password": "password123"
}
```

#### Success Response:

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "message": "User registered successfully",
    "userID": [user_id]
  }
  ```

#### Error Responses:

- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Name, Email, and Password are required fields"
    }
    ```
- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Email already exists"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error registering user"
    }
    ```

---

### Log in a User

Logs in an existing user with the provided credentials.

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**
  - `Email` (string, required): The email address of the user.
  - `Password` (string, required): The password for the user account.

#### Example Request:

```json
{
  "Email": "johndoe@example.com",
  "Password": "password123"
}
```

#### Success Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Login successful",
    "token": "[JWT Token]"
  }
  ```

#### Error Responses:

- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Email and Password are required fields"
    }
    ```
- **Status Code:** `401 Unauthorized`
  - **Response Body:**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error logging in user"
    }
    ```

---

---

## Transactions API Documentation

### Add a New Transaction

Adds a new transaction for the authenticated user.

- **URL:** `/api/transactions`
- **Method:** `POST`
- **Authorization:** `Bearer [JWT Token]`
- **Request Body:**
  - `Type` (string, required): The type of transaction (`income` or `expense`).
  - `Amount` (number, required): The amount of the transaction.
  - `Date` (string, required): The date of the transaction (format: YYYY-MM-DD).
  - `Description` (string, optional): Description of the transaction.

#### Example Request:

```json
{
  "Type": "expense",
  "Amount": 50.00,
  "Date": "2024-03-11",
  "Description": "Grocery shopping"
}
```

#### Success Response:

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "message": "Transaction created successfully",
    "transactionID": [transaction_id]
  }
  ```

#### Error Responses:

- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Start date and end date are required."
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error creating transaction"
    }
    ```

---

### Retrieve List of Transactions

Retrieves a list of transactions for the authenticated user within a specified date range.

- **URL:** `/api/transactions`
- **Method:** `GET`
- **Authorization:** `Bearer [JWT Token]`
- **Query Parameters:**
  - `startDate` (string, required): Start date of the transaction range (format: YYYY-MM-DD).
  - `endDate` (string, required): End date of the transaction range (format: YYYY-MM-DD).

#### Example Request:

```
GET /api/transactions?startDate=2024-03-01&endDate=2024-03-11
```

#### Success Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  [
    {
      "TransactionID": 1,
      "UserID": [user_id],
      "Type": "expense",
      "Amount": 50.00,
      "Date": "2024-03-11",
      "Description": "Grocery shopping"
    },
    ...
  ]
  ```

#### Error Responses:

- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Start date and end date are required"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error fetching transactions"
    }
    ```

---

### Retrieve Transaction Summary

Retrieves a summary of transactions for the authenticated user within a specified date range.

- **URL:** `/api/transactions/summary`
- **Method:** `GET`
- **Authorization:** `Bearer [JWT Token]`
- **Query Parameters:**
  - `startDate` (string, required): Start date of the transaction range (format: YYYY-MM-DD).
  - `endDate` (string, required): End date of the transaction range (format: YYYY-MM-DD).

#### Example Request:

```
GET /api/transactions/summary?startDate=2024-03-01&endDate=2024-03-11
```

#### Success Response:

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "summary": {
      "totalIncome": 1500.00,
      "totalExpenses": 750.00,
      "savings": 750.00
    }
  }
  ```

#### Error Responses:

- **Status Code:** `400 Bad Request`
  - **Response Body:**
    ```json
    {
      "error": "Start date and end date are required"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error retrieving transaction summary"
    }
    ```

---

### Delete a Specific Transaction

Deletes a specific transaction for the authenticated user.

- **URL:** `/api/transactions/:id`
- **Method:** `DELETE`
- **Authorization:** `Bearer [JWT Token]`
- **URL Parameters:**
  - `id` (number, required): The ID of the transaction to be deleted.

#### Example Request:

```
DELETE /api/transactions/1
```

#### Success Response:

- **Status Code:** `204 No Content`

#### Error Responses:

- **Status Code:** `404 Not Found`
  - **Response Body:**
    ```json
    {
      "error": "Transaction not found"
    }
    ```
- **Status Code:** `500 Internal Server Error`
  - **Response Body:**
    ```json
    {
      "error": "Error deleting transaction"
    }
    ```

---

## Contributing

Contributions are welcome! Please create a pull request with your changes.
