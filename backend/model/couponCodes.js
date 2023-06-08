const mongoose = require("mongoose");

const couponCodesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupon codes name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    required: true,
  },
  selectedProducts: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CouponCodes", couponCodesSchema);
