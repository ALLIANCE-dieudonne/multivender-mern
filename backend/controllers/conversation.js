const Conversation = require("../model/conversation");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const express = require("express");
const router = express.Router();

//create a new conversation

router.post(
  "/create-conversation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, sellerId, userId } = req.body;
      const isConversationExists = await Conversation.findOne({
        groupTitle,
      }).exec();

      if (isConversationExists) {
        const conversation = isConversationExists;

        res.status(200).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(200).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler("Error creating conversation"), 500);
    }
  })
);

module.exports = router;
