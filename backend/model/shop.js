const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },

  address: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "seller",
  },
  avatar: [
    {
      type: String,
      required: true,
    },
  ],
  zipCode: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

// Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

shopSchema.pre("remove", async function (next) {
  try {
    // Find all products associated with the shopId of the shop being removed
    const productsToDelete = await Product.find({ shopId: this._id });

    // Delete the associated products
    await Promise.all(productsToDelete.map((product) => product.remove()));

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Shop", shopSchema);
