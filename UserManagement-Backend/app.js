require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models/index");
const User = require("./src/models/user");
const Task = require("./src/models/task");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// Configure CORS for frontend and local development
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://user-management-frontend-a7l6.vercel.app", // Allowed production client
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Route groups
app.use("/api/auth", authRoutes);  // Authentication endpoints
app.use("/api/tasks", taskRoutes); // Task CRUD endpoints (protected inside routes)

const PORT = process.env.PORT || 4000;

// Initialize DB and start server
(async () => {
  await sequelize.sync({ alter: true }); // Auto-update models during development
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})();
