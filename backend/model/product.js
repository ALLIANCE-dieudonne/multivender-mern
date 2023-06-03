const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please select your product category"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your product tags"],
  },
  orginalPrice: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  discountPrice: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  stock: {
    type: String,
    required: [true, "Please enter your product name"],
  },
});
