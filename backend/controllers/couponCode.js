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

//getting coupon codes
router.get(
  "/get-all-coupons/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CouponCodes.find({ "shop._id": req.params.id });

      res.status(200).json({
        success: true,
        coupons,
      });
    } catch (err) {
      next(new ErrorHandler(err, 500));
    }
  })
);

//get coupon code by its name

router.get(
  "/get-coupon-code/:name", 
  catchAsyncErrors(async (req, res, next) => {

    const cupounCode = await CouponCodes.findOne({
      name: req.params.name,
    });

    if (!cupounCode) {
        
      return next(new ErrorHandler("Cannot find coupon code!", 404)); 
    }

    res.status(200).json({
      success: true,
      cupounCode,
    });
  })
);


module.exports = router;
