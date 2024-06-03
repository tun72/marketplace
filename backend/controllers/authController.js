const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
dotenv.config();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.register = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }
  const { name, email, password } = req.body;

  const isUser = await User.findOne({ email });

  if (isUser) {
    const error = new Error("User Already Exist!");
    error.statusCode = 403;
    throw new Error(error);
  }

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    isSuccess: true,
    message: "Successfully Register ✅",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array[0],
    });
  }

  const { email, password } = req.body;

  const oldUser = await User.findOne({ email }).select("+password");

  if (!oldUser) {
    return res.status(401).json({
      message: "Authentication Error! Check Email and Password !",
    });
  }

  const isMatch = await bcrypt.compare(password, oldUser.password);

  console.log(isMatch);
  if (!isMatch) {
    return res.status(401).json({
      message: "Authentication Error! Check Email and Password !",
    });
    // throw new Error("Invalid password.");
  }

  const token = jwt.sign({ userId: oldUser._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    isSuccess: true,
    message: "Successfully Login ✅",
    user: {
      email: oldUser.email,
      name: oldUser.name,
      userId: oldUser._id,
    },
    token,
  });
});

exports.checkUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) throw new error("Error Occour! No User");

  return res.status(200).json({
    isSuccess: true,
    message: "User is authorized",
    user,
  });
});
