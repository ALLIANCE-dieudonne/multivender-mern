const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const ErrorHandler = require("../utils/errorHandler");
const Shop = require("../model/shop");
const Order = require("../model/order");
const fs = require("fs");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const { imageUpload ,deleteImage} = require("../middleware/imageUpload");

//create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId).exec();
      if (!shop) {
        return new ErrorHandler("Invalid shop id", 400);
      }
      const existingProduct = await Product.findOne({
        name: req.body.name,
        "shop._id": shopId,
      });
      if (existingProduct) {
        return next(new ErrorHandler("Product already exists", 409));
      }

      const files = req.body.images;
      const folder = "products";
      const results = await imageUpload(files, folder);

      const imageObjects = results.map((result) => ({
        public_id: result.public_id,
        secure_url: result.secure_url,
      }));

      const productData = req.body;
      productData.images = imageObjects;
      productData.shop = shop.toObject();

      const productName = productData.name;

      const product = await Product.create(productData);

      res.status(200).json({
        success: true,
        product,
      });
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
      const shopId = req.params.id;
      const products = await Product.find({ shopId: req.params.id });

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

// router.delete(
//   "/delete-shop-product/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const productId = req.params.id;
//       const productData = await Product.findById(productId);

//       productData.images.forEach((imageUrl) => {
//         const fileName = imageUrl;
//         const filePath = `uploads/${fileName}`;

//         fs.unlink(filePath, (err) => {
//           if (err) {
//             res.status(500).json({ message: "error in deletin a file" });
//           } else {
//             res.status(200).json({ message: "file deleted successfully" });
//           }
//         });
//       });

//       const product = await Product.findByIdAndDelete(productId);

//       if (!product) {
//         return next(new ErrorHandler("Product not found", 404));
//       }

//       res.status(200).json({
//         success: true,
//         message: "Product deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = await Product.findById(productId);

      // Get an array of public_ids from the productData
      const publicIds = productData.images.map((image) => image.public_id);

      // Delete the images from Cloudinary
      for (const publicId of publicIds) {
        await deleteImage(publicId);
      }

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

//product reviw

router.put(
  "/create-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, productId, rating, comment, orderId } = req.body;
      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found"));
      }

      const review = {
        user,
        productId,
        comment,
        rating,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      await Order.findOneAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      res.status(200).json({
        success: true,
        message: "Reviews added successfully!",
      });

      product.save({ validateBeforeSave: false });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
