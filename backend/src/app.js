const express = require("express");
const logger = require("./middleware/logger");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TeamTask API is running",
    note: "Routes listesi kolay test için. Prod'da böyle bir şey dönmez.",
    routes: [
      { method: "GET", path: "/" },
      { method: "GET", path: "/tasks" },
      { method: "GET", path: "/tasks/:id" },
      { method: "POST", path: "/tasks" },
      { method: "PUT", path: "/tasks/:id" },
      { method: "DELETE", path: "/tasks/:id" },
      { method: "GET", path: "/tasks/search?keyword=" },
      { method: "GET", path: "/tasks?status=&priority=&assignee=&page=&limit=&sort=" },
      { method: "GET", path: "/projects" },
      { method: "GET", path: "/projects/:id" },
      { method: "POST", path: "/projects" },
      { method: "PUT", path: "/projects/:id" },
      { method: "DELETE", path: "/projects/:id" },
      { method: "GET", path: "/users" },
      { method: "GET", path: "/users/:id" },
      { method: "POST", path: "/users" },
      { method: "PUT", path: "/users/:id" },
      { method: "DELETE", path: "/users/:id" },
      { method: "GET", path: "/reports/summary" },
      { method: "GET", path: "/reports/completed" },
      { method: "GET", path: "/reports/pending" },
    ],
  });
});

app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
