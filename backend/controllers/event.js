const express = require("express");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Shop = require("../model/shop");
const Event = require("../model/events");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");
const { imageUpload, deleteImage } = require("../middleware/imageUpload");

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
      }
      const existingEvent = await Event.findOne({
        name: req.body.name,
        "shop._id": shopId,
      });
      if (existingEvent) {
        return new ErrorHandler("Event already exists", 409);
      }

      const files = req.body.images;
      const folder = "events";
      const results = await imageUpload(files, folder);

      const imageObjects = results.map((result) => ({
        public_id: result.public_id,
        secure_url: result.secure_url,
      }));

      const imageIds = results.map((i) => i.public_id);

      const eventData = req.body;
      eventData.images = imageObjects;
      eventData.shop = shop.toObject();

      // const eventName = eventData.name;

      const event = await Event.create(eventData);
      res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      for (const publicId of imageIds) {
        await deleteImage(publicId);
      }
      return new Error(error.message, 500);
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

      // Get an array of public_ids from the eventData
      const publicIds = eventData.images.map((image) => image.public_id);

      // Delete the images from Cloudinary
      for (const publicId of publicIds) {
        await deleteImage(publicId);
      }

      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        return next(new ErrorHandler("event not found", 404));
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
