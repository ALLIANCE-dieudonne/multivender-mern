const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../model/shop");
const fs = require("fs");

// Create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId).exec();
      if (!shop) {
        return new ErrorHandler("Invalid shop id", 400);
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);
        const productData = req.body;

        productData.images = imageUrls;
        productData.shop = shop.toObject();

        const productName = productData.name;
        console.log(productName);
        const existingProduct = await Product.findOne({ name: productName });

        if (existingProduct) {
          for (const imageUrl of imageUrls) {
            fs.unlink(imageUrl, (err) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting a file" });
              } else {
                console.log(`File ${imageUrl} deleted successfully`);
              }
            });
          }
          return next(new ErrorHandler("Product already exists", 409));
        }

        const product = await Product.create(productData);

        res.status(200).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//get all products
router.get(
  "/all-shop-products/:id",
  catchAsyncErrors(async(req, res, next) => {
    try {

      const products = await Product.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        products
      })

    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
