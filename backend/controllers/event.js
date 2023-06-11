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
        throw new ErrorHandler("Invalid shop id", 400);
      }

      const files = req.files;
      const imageUrls = files.map((file) => file.filename);

      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop.toObject();
      console.log(eventData.images);

      const eventName = eventData.name;
      const existingEvent = await Event.findOne({
        name: eventName,
        "shop._id": shopId,
      });

      if (existingEvent) {
        for (const imageUrl of imageUrls) {
          fs.unlink(path.join( imageUrl), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`File ${imageUrl} deleted successfully`);
            }
          });
        }
        throw new ErrorHandler("Event already exists", 409);
      }

      const event = await Event.create(eventData);

      res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      next(error);
    }
  })
);

//get all shop events
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

//get all events

router.get(
  "/all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const allEvents = await Event.find();
      console.log(allEvents)

      res.status(200).json({
        success: true,
        allEvents,
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
