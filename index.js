const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const blogRouter = require("./routes/blog.routes");
const rateLimiter = require("./middleware/rateLimiter")

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(rateLimiter)

// database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    throw error;
  }
};
// checking database disconnection
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use("/api/auth", userRouter);
app.use("/api/blog", blogRouter);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || "Something went wrong! Please try after some time.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// middleware for no route
app.use((req, res, next) => {
  res.status(400).json({
    message: "no route found",
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("Server started");
});
