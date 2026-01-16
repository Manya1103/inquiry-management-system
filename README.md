# Inquiry Management System

This project is an Inquiry Management System consisting of a Node.js/Express backend and a React frontend.

## Project Structure

- `backend/`: Server-side code
- `frontend/`: Client-side application

## Prerequisites

- Node.js installed on your machine
- MongoDB (local or Atlas)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory and configure your MongoDB connection string and port (if applicable).

4. Start the server:
   - For development (using nodemon):
     ```bash
     npm run dev or node index.js
     ```
   - For production:
     ```bash
     npm start
     ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Technologies Used

- **Backend**: Node.js, Express, Mongoose (MongoDB)
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios
