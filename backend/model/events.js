const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please select your event product category!"],
  },
  startDate: {
    type: Date,
    required: [true, "Please enter your event product start date!"],
  },
  endDate: {
    type: Date,
    required: [true, "Please enter your event product finished date!"],
  },
  tags: {
    type: String,
    required: [true, "Please enter your event product tags!"],
  },
  orginalPrice: {
    type: String,
    required: [true, "Please enter your event product orrginal price!"],
  },
  discountPrice: {
    type: String,
    required: [true, "Please enter your event product discount price!"],
  },
  stock: {
    type: String,
    required: [true, "Please enter your event product stock!"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
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
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
