const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Log in to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id)

  next();
});


// exports.isSeller = catchAsyncErrors(async (req, res, next) => {
//   const {seller_token} = req.cookies;

//   if (!seller_token) {
//     return next(new ErrorHandler("Log in to continue", 401));
//   }

//   const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

//   req.seller = await Shop.findById(decoded.id);

//   next();
// });

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Log in to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
      return next(new ErrorHandler("Seller not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

