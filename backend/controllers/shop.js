const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/errorHandler");
const {  isSeller } = require("../middleware/auth");
const Shop = require("../model/shop");
const { upload } = require("../multer");

router.post("/shop-create", upload.single("file"), async (req, res, next) => {

  //creating the shop
  try {
    const { email, name, password, address, zipCode, phoneNumber } = req.body;
    const existingShop = await Shop.findOne({ email });

    if (existingShop ) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error in deleting a file" });
        } else {
          res.status(200).json({ message: "file deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists", 409));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
      address: address,
      zipCode: zipCode,
      phoneNumber: phoneNumber,
    
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click the link below to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email (${seller.email}) to activate your shop`,
      });
    } catch (err) {
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
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { email, name, password, address, zipCode, phoneNumber,avatar } =
        newSeller;

       await Shop.create({
        name,
        email,
        password,
        avatar,
        address,
        zipCode,
        phoneNumber,
      });

      sendShopToken(newSeller, 201, res);
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


module.exports = router;




