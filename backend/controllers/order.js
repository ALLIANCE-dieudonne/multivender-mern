const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");

// Create a new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, status, paymentInfo } =
        req.body;

      if (!Array.isArray(cart)) {
        throw new ErrorHandler("Invalid cart data", 400);
      }

      // Group shop items by shopId
      const shopItemMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemMap.has(shopId)) {
          shopItemMap.set(shopId, []);
        }
        shopItemMap.get(shopId).push(item);
      }

      // Create order for each shop item
      const orders = [];

      for (const [shopId, items] of shopItemMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          status,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all user orders
router.get(
  "/all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ "user.user._id": userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all orders of the shop

router.get(
  "/shop-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
  const shopId = req.params.shopId;
  const orders = await Order.find({ "cart.shopId": shopId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    orders,
  });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
