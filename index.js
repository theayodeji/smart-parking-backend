import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow credentials and specify the frontend origin
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`🚗💨 Server is running on port ${PORT}`);
});
