const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const morgan = require("morgan");
require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

(async () => {
  try {
    const mongod = await MongoMemoryServer.create();
    const uri =
      process.env.NODE_ENV === "test" ? mongod.getUri() : process.env.DB;

    const hey = await mongoose.connect(uri, {
      useNewUrlParser: true,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.log(err, "NOOOOO");
  }
})();

// Since mongoose's Promise is deprecated, we override it with Node's Promise
// mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", routes);
app.get("/", function (req, res) {
  res.send({ message: "Connected to base" });
});

app.use((err, req, res, next) => {
  next();
});

module.exports = app;
