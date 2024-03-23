const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/connectionDataBase");

const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDB = require("./config/connectionDataBase");
// connection to mongodb
connectToDB();
// init app
const app = express();
// middleware
app.use(express.json());

// Routes
app.use("/books", require("./routes/books"));
app.use("/authors", require("./routes/authors"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

// error handler middleware
app.use(notFound);
app.use(errorHandler);

//  Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
