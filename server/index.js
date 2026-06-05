const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json()); // help to read json from req.body

// app.get("/", (req, res) => {
//   res.json({ message: "Server is running!" });
// });

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

//error handler
app.use(errorHandler);

//health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Health OK" });
});

//database connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log("Database connection error: ", err);
    process.exit(1);
  }
};
connectDB();
