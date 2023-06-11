const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../model/shop");
const fs = require("fs");
const { isSeller } = require("../middleware/auth");

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
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = req.body;

        productData.images = imageUrls;
        productData.shop = shop.toObject();

        const productName = productData.name;
        console.log(productName);
        const existingProduct = await Product.findOne({
          name: productName,
          "shop._id": shopId,
        });

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

//get all products shop products
router.get(
  "/all-shop-products/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.params.id
      const products = await Product.find({ shopId: req.params.id });
      console.log(shopId)

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete shop product

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const fileName = imageUrl;  
        const filePath = `uploads/${fileName}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            res.status(500).json({ message: "error in deletin a file" });
          } else {
            res.status(200).json({ message: "file deleted successfully" });
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);


      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


//getting all products

router.get(
  "/all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allproducts = await Product.find();

      res.status(200).json({
        success: true,
        allproducts,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
