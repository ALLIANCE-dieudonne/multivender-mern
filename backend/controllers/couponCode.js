

const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const CouponCodes = require("../model/couponCodes");

// Create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const existingCouponCode = await CouponCodes.findOne({
      name: req.body.name,
    });

    if (existingCouponCode) {
      return next(new ErrorHandler("Coupon Code already exists", 404));
    }

    const couponCode = await CouponCodes.create(req.body);

    res.status(200).json({
      success: true,
      couponCode,
    });
  })
);

module.exports = router;
