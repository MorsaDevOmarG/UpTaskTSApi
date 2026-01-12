import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

// Routes, .use porque va soportar todos los VERBOS HTTP
app.use('/api/projects', projectRoutes);

export default app;