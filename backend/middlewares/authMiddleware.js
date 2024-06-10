const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const User = require("../models/userModel");
dotenv.config();

exports.protect = catchAsync(async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader)
    return res.status(401).json({ message: "Not authenticated!" });

  const token = authHeader.split(" ")[1];

  
  if (!token)
    return res.status(401).json({ message: "Auth Error! Token Wrong" });

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

  const user = await User.findById(decoded.userId);

  if (!user)
    return res.status(401).json({ message: "Auth Error!Token is wrong" });


  if(user.status === "banned") {
    return res.status(401).json({ message: "Account Was Banned" });
  }

  req.user = user;
  next();
});
