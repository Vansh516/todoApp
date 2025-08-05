let dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database.config");
const { error } = require("./middlewares/error.middlewares");

const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const { authenticate } = require("./middlewares/auth.middlewares");

// console.log(process.env);

connectDB();

// console.log(dotenv);

const app = express();

app.use(express.json());
app.use(morgan("dev")); // used for logging in backend
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/tasks", authenticate, taskRoutes); // injected the middleware
app.use("/api/users", userRoutes);
// console.log(process.env);

app.use(error);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server running", process.env.PORT);
});


// initially
// git init
// git add .
// git commit -m "message"
// git remote add origin https://github.com/Vansh516/eKart.git
// git push -u origin main

// subsequent changes
// git add .
// git commit -m "message"
// git push
