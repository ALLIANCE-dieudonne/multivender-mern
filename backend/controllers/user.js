const express = require("express");
const User = require("../model/user");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const { isAuthenticated } = require("../middleware/auth");

//creating user

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "error in deletin a file" });
      } else {
        res.status(200).json({ message: "file deleted successfully" });
      }
    });
    return next(new ErrorHandler("User already exists", 409));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  const activationToken = createActivationToken(user);
  const activationUrl = `http://localhost:3000/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hellow ${user.name}, please click the link below to activate your account ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Pleasse check your email: ${user.email} to activate your account`,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
});

//creating activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate the user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      const { name, email, password, avatar } = newUser;

      const user = await User.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

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
      // console.log(error.message);
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
      const existingAvatar = `uploads/${existingUser?.avatar}`;

      // Check if the user has an existing avatar and delete it
      if (existingUser.avatar) {
        fs.unlinkSync(existingAvatar);
      }

      const fileUrl = req.file.filename;

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({ success: true, user });
    } catch (error) {
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

module.exports = router;
