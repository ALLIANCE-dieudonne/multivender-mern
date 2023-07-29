const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const { imageUpload, deleteImage } = require("../middleware/imageUpload");

router.post("/shop-create", upload.single("file"), async (req, res, next) => {
  try {
    const { email, name, password, address, zipCode, phoneNumber } = req.body;
    const existingShop = await Shop.findOne({ email });
    let avatar, pubId;

    if (existingShop) {
      return next(new ErrorHandler("User already exists", 409));
    }

    try {
      const file = req.body.file;
      const folder = "shopAvatars";
      const result = await imageUpload(file, folder);
      avatar = result[0].secure_url;
      pubId = result[0].public_id;
    } catch (error) {
      return next(new ErrorHandler("Couldn't upload avatar", 500));
    }

    const newShop = new Shop({
      name,
      email,
      password,
      avatar: [avatar, pubId],
      address,
      zipCode,
      phoneNumber,
    });

    await newShop.save();

    res.status(200).json({
      success: true,
      shop: newShop,
    });
    sendShopToken(newShop,200, resolve);
  } catch (error) {
    await deleteImage(pubId);
    return next(new ErrorHandler(error.message, 400));

  }
});

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
      const existingAvatar = existingSeller?.avatar[1];

      // Check if the user has an existing avatar and delete it
      if (existingAvatar) {
        await deleteImage(existingAvatar);
      }

      const file = req.body.image;
      const folder = "shopAvatars";
      const result = await imageUpload(file, folder);
      const avatar = result.secure_url;
      const pubId = result.public_id;

      const shop = await Shop.findByIdAndUpdate(req.seller._id, {
        $set: { "avatar.0": `${avatar}`, "avatar.1": `${pubId}` },
      }).lean();

      res.status(200).json({ success: true, shop });
    } catch (error) {
      await deleteImage(pubId);
      return next(new ErrorHandler("Failed to update avatar"), 400);
    }
  })
);

module.exports = router;
