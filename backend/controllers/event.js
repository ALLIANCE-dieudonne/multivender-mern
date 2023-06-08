const express = require("express");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Shop = require("../model/shop");
const Event = require("../model/events");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");



// Create event
router.post(
  "/create-event",
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
        const eventData = req.body;

        eventData.images = imageUrls;
        eventData.shop = shop.toObject();

        const eventName = eventData.name;
        console.log(eventName);
        const existingEvent = await Event.findOne({ name: eventName });

        if (existingEvent) {
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
          return next(new ErrorHandler("Event already exists", 409));
        }

        const event = await Event.create(eventData);

        res.status(200).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all events
router.get(
  "/all-shop-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete shop event

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;

       const eventData = await Event.findById(eventId);

       eventData.images.forEach((imageUrl) => {
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

      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new ErrorHandler("event not found!", 404));
      }

      res.status(200).json({
        success: true,
        message: "event deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;


module.exports = router;
