const express = require("express");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });


const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDB = require("./config/connectionDataBase");
// connection to mongodb
connectToDB();
// init app
const app = express();
// staticfolder
app.use(express.static(path.join(__dirname, "images")))
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// view engine
app.set('view engine','ejs')
// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

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
