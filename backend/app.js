const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  
  })
);

app.use(helmet({
  crossOrginResourcePolicy: false
}))
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//import routes
const user = require("./controllers/user");
const shop = require("./controllers/shop");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);

//for error handling
app.use(ErrorHandler);
module.exports = app;