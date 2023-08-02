const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const db = require("./db");

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
// Set up the uploads folder to serve static images
app.use("/uploads", express.static("uploads"));

// Import and use the routes
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// Start the server
db.sync() // Sync the database schema with the models
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
