# User Management Backend

This is the backend service for the user management system. It provides RESTful APIs for creating, deleting, and fetching users, along with other functionalities like checking if a user already exists and paginating through users.

## Features

- **Create a new user**: Endpoint to create a new user in the system.
- **Delete a user**: Endpoint to delete a user from the system by their ID.
- **Get all users**: Endpoint to retrieve a paginated list of users, with optional search functionality.
- **Check if user exists**: Endpoint to check if a user already exists in the system based on email and company ID.

## Tech Stack

- **Backend Framework**: Express.js
- **Database**:  Currently using mock data for user management.
- **Other Services**: 
  - `retryService` for retrying operations
  - `errorService` for handling errors
  - `userService` for handling user-related business logic

## Prerequisites

Before running the backend server, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/miriam-altman/Users-Frontend.git
2. Install the packages
   ```bash
   npm install
3. Run the project
   ```bash
   npm start

The server will start on http://localhost:5000.