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


## Contributing

Contributions are welcome! Please create a pull request with your changes.

---

