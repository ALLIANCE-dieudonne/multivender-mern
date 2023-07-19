const express = require("express");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const Shop = require("../model/shop");
const { upload } = require("../multer");

router.post("/shop-create", upload.single("file"), async (req, res, next) => {
  try {
    const { email, name, password, address, zipCode, phoneNumber } = req.body;
    const existingShop = await Shop.findOne({ email });

    if (existingShop) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error deleting a file" });
        } else {
          res.status(200).json({ message: "File deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists", 409));
    }

    const filename = req.file.filename;
    const fileUrl = filename;

    const activationToken = createActivationToken({ email });
    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    const newShop = new Shop({
      name,
      email,
      password,
      avatar: fileUrl,
      address,
      zipCode,
      phoneNumber,
      activationToken, 
    });

    // Save the new shop
    await newShop.save();

    try {
      await sendMail({
        email,
        subject: "Activate your shop",
        message: `Hello ${name}, please click the link below to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email (${email}) to activate your shop`,
      });
    } catch (err) {
      await newShop.remove();
      return next(new ErrorHandler("Error sending email", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});



// Creating activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate the seller

router.post(
  "/shop/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const decodedSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!decodedSeller || !decodedSeller.email) {
        return next(new ErrorHandler("Invalid Activation Token", 400));
      }

      const existingShop = await Shop.findOne({ email: decodedSeller.email });

      if (!existingShop || existingShop.activationToken !== activation_token) {
        return next(new ErrorHandler("Invalid Activation Token", 400));
      }

      const { email, name, password, address, zipCode, phoneNumber, avatar } =
        existingShop;

      // Create the shop
      await Shop.create({
        name,
        email,
        password,
        avatar,
        address,
        zipCode,
        phoneNumber,
      });

      // Remove the activation token from the existing shop
      existingShop.activationToken = undefined;
      await existingShop.save();

      res.status(200).json({
        success: true,
        message: "Shop activated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logging in the seller
router.post(
  "/login-seller",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("User email and Password are required", 400)
        );
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("seller doesn't exist!"), 400);
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password or email"), 400);
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load seller
router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Shop doesn't exist!", 400));
      }

      res.status(200).json({
        success: true,
        seller: seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.clearCookie("seller_token");

      res.status(200).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get shop information

router.get(
  "/getshop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exist!", 400));
      }

      res.status(200).json({
        success: true,
        shop: shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//updating shop information

router.put(
  "/update-shop-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, address, phoneNumber, shopId } = req.body;

      const updatedShop = await Shop.findOneAndUpdate(
        { _id: shopId },
        { name, phoneNumber, address },
        { new: true }
      );

      if (!updatedShop) {
        return next(new ErrorHandler("Shop not found!", 404));
      }

      res.status(200).json({ success: true, user: updatedShop });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update shop avatar

router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existingSeller = await Shop.findById(req.seller._id);
      const existingAvatar = `uploads/${existingSeller?.avatar}`;

      // Check if the user has an existing avatar and delete it
      if (existingSeller?.avatar) {
        fs.unlinkSync(existingAvatar);
      }

      const fileUrl = req.file.filename;

      const shop = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });
      const data = { message: "success" };

      res.status(200).json({ success: true, shop });
    } catch (error) {
      // return next(new ErrorHandler("Failed to update avatar"), 400);
      console.log(error);
    }
  })
);

module.exports = router;
