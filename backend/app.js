const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

app.use(express.json());
app.use(cookieParser());


const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: "GET, POST, PUT, DELETE", // Allow specified HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allow specified headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

app.use(
  helmet({
    crossOrginResourcePolicy: false,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config

require("dotenv").config();
console.log(process.env.NODE_EN);

//import routes
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const couponCodes = require("./controllers/couponCode");
const order = require("./controllers/order");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", couponCodes);
app.use("/api/v2/order", order);

//for error handling
app.use(ErrorHandler);
module.exports = app;
