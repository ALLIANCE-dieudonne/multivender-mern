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
    required: [true, "Please select your product category!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your product tags!"],
  },
  orginalPrice: {
    type: String,
    required: [true, "Please enter your product orrginal price!"],
  },
  discountPrice: {
    type: String,
    required: [true, "Please enter your product discount price!"],
  },
  stock: {
    type: String,
    required: [true, "Please enter your product stock!"],
  },

  images: [{ type: String }],
  
  shopId: {
    type: String,
    required: true,
},
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Product", productSchema);
