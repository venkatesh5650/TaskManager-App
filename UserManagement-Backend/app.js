require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/models/index");
const User = require("./src/models/user");
const Task = require("./src/models/task");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://user-management-frontend-a7l6.vercel.app", // ✅ FIXED
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync({ alter: true }); // dev: keep sync simple
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})();
