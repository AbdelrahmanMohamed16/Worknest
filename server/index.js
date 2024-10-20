// app.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authentication");
const workspaceRoutes = require("./routes/workspace");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const passwordResetRoutes = require("./routes/passwordReset");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/verifyToken");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

// CORS Middleware
app.use(cors()); // Enable CORS for all routes

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // These options avoid deprecation warnings
      useUnifiedTopology: true, // Ensures compatibility with MongoDB drivers
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/task", authMiddleware, taskRoutes);
app.use("/api/workspace", authMiddleware, workspaceRoutes);
app.use("/api/password-reset", authMiddleware, passwordResetRoutes);
app.use("/", (req, res) => {
  res.send("Server is Runing");
});
app.use(notFound);
app.use(errorHandler);

app.listen();
