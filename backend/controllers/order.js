const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");
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
  "/all-shop-orders/:shopId",
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

//update order status

router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      if (order.status === req.body.status) {
        return next(
          new ErrorHandler("The status has already been updated", 400)
        );
      }

      if (req.body.status === "Transffered to delivery person") {
        for (const item of order.cart) {
          await updateOrder(item._id, item.qty);
        }
      }

      order.status = req.body.status;
      if (order.status === "Delivered") {
        order.paidAt = Date.now();
        order.status = "succeeded";
        order.paymentInfo.type = "Paid";
      }

      await order.save({ validateBeforeSave: false });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//handling refund
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund was successfully Requested!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//refund sucess
router.put(
  "/order-refund-sucess/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      if (req.body.status === "Refund Success") {
        for (const item of order.cart) {
          await updateOrder(item._id, item.qty);
        }
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);
        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund sucess!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
