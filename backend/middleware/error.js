const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongo id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key Error

  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} occured`;
    err = new ErrorHandler(message, 409);
  }

  // //wrong jwt
  // if (err.name === "JsonWebTokenError") {
  //   const message = `Your url is unvalid try again later`;
  //   err = new ErrorHandler(message, 401);
  // }

  // //Expired jwt
  // if ((err.name = "TokenExpiredError")) {
  //   const message = `Your url is expired please try again later`;
  //   err = new ErrorHandler(message, 401);
  // }
   
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

