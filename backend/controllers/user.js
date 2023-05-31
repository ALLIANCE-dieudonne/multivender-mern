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

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        // console.log(err);
        res.status(500).json({ message: "error in deletin a file" });
      } else {
        res.status(200).json({ message: "file deleted successfully" });
      }
    });
    return next(new ErrorHandler("User already exists", 409));
    // console.log(err);
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
    // console.log(err);
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
  catchAsyncErrors(async (req, res) => {
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

      await User.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(newUser, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
      // console.log(error.message);
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

      // console.log(user);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
      // console.log(error);
    }
  })
);

//log out user

router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      // console.log("it is working");
      res.clearCookie("token");

      res
        .status(201)
        .json({
          success: true,
          message: "Log out success",
        })

       
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      console.log(error);
    }
  })
);
module.exports = router;
