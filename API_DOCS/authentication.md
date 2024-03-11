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

This documentation provides information on how to use your API endpoints for user registration and authentication. Ensure that requests are made with the appropriate data and handle the responses accordingly.