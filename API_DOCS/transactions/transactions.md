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

This documentation provides information on how to use your API endpoints for managing transactions. Ensure that requests are made with the appropriate data and handle the responses accordingly.