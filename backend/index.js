import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import inquiryRouter from "./routes/inquiryRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json()); // Allows server to read JSON data
app.use(cors()); // Allow requests from your front-end
app.use("/api/inquiries", inquiryRouter); 

// Simple test route
app.get("/", (req, res) => {
  res.send("Hello from Inquiry Management System Backend!");
});

// Function to start the server
const Server = async () => {
  try {
    // Connect to MongoDB
    await connectDB(); // Call the function from config/mongoDB.js

    // Start listening for requests
    const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
    app.listen(PORT, () => {
      console.log(
        `Server is running successfully on port http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

Server(); // Run the function to connect DB and start server
