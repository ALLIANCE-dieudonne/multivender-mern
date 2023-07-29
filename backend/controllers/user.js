const express = require("express");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const { isAuthenticated } = require("../middleware/auth");
const { error } = require("console");
const { imageUpload, deleteImage } = require("../middleware/imageUpload");

//creating user

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let avatar, pubId;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 409));
    }

    try {
      const file = req.body.file;
      const folder = "avatars";
      const result = await imageUpload(file, folder);
      avatar = result[0].secure_url;
      pubId = result[0].public_id;
    } catch (error) {
      return next(new ErrorHandler("Couldn't upload avatar", 500));
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      avatar: [avatar, pubId],
    });

    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
    sendToken(user, 200, res)
  } catch (error) {
    await deleteImage(pubId);
    return next(new ErrorHandler("Failed to create user!"), 500);
  }
});

//login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ErrorHandler("User email and Password are required", 400)
        );
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!"), 400);
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password or email"), 400);
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load a user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!"), 400);
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out user

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.clearCookie("token");

      res.status(201).json({
        success: true,
        message: "Log out success",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user
router.put(
  "/update-user-info",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, phoneNumber, password } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { email },
        { name, email, phoneNumber, password },
        { new: true }
      );

      if (!updatedUser) {
        return next(new ErrorHandler("User not found!", 404));
      }

      const isPasswordValid = await updatedUser.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide correct information!", 400)
        );
      }
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existingUser = await User.findById(req.user.id);
      const existingAvatar = existingUser?.avatar[1];

      // Check if the user has an existing avatar and delete it

      if (existingAvatar) {
        await deleteImage(existingAvatar);
        console.log("deleting existing avatar");
      }

      const file = req.body.image;
      const folder = "avatars";
      const result = await imageUpload(file, folder);
      const avatar = result.secure_url;
      const pubId = result.public_id;

      const user = await User.findByIdAndUpdate(req.user.id, {
        $set: { "avatar.0": `${avatar}`, "avatar.1": `${pubId}` },
      }).lean();

      res.status(200).json({ success: true, user });
    } catch (error) {
      await deleteImage(pubId);
      return next(new ErrorHandler("Failed to update avatar"), 400);
    }
  })
);

//update user addresses

router.put(
  "/update-user-address",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} Address already exists`,
            409
          )
        );
      }

      const existDresses = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existDresses) {
        Object.assign(existDresses, req.body);
      } else {
        //add new address
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to update avatar"), 400);
    }
  })
);

//delete adress

router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Failed to delete address", 400));
    }
  })
);

//update password

router.put(
  "/change-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordValid = await user.comparePassword(req.body.oldPassword);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Old password not correct!", 400));
      }
      if (req.body.newPassword === req.body.confirmPassword) {
        return next(
          new ErrorHandler(
            "New password and confirm password must be same!",
            400
          )
        );
      }

      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to update password", 400));
    }
  })
);

//get user infromation using id

router.get(
  "/users/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler("Failed to update password", 400));
    }
  })
);

module.exports = router;
