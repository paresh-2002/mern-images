import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from './src/routes/user.routes.js';
import customerRouter from './src/routes/customer.routes.js';
import imageRouter from './src/routes/image.routes.js';
import connectDB from "./src/db/index.js";

dotenv.config();

// Create an Express server
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Ensure FRONTEND_URL is set in .env
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Set up routes
app.use("/images", imageRouter);
app.use("/auth", userRouter);
app.use("/customer", customerRouter);

// Error handling (Optional but recommended)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

// Start the server after DB connection
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
