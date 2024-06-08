const Product = require("../models/productModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const LIMIT_PRODUCTS = 8;
  const page = parseInt(req.query?.page) || 1;

  const products = await Product.find()
    .populate("userId", "name")
    .skip((page - 1) * LIMIT_PRODUCTS)
    .limit(LIMIT_PRODUCTS);

  const totalProducts = await Product.find().countDocuments();

  const totalPages = Math.ceil(totalProducts / LIMIT_PRODUCTS);

  return res.status(200).json({
    products,
    totalPages,
    currentPage: page,
    totalProducts,
    isSuccess: true,
  });
});

exports.approveProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  let { key } = req.body;

  if (!["approve", "rollback", "reject"].includes(key)) {
    throw new Error("Product  key is invalid.");
  }
  let status = key;

  if (key === "rollback") status = "pending";

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found.");
  }

  product.status = status;
  await product.save();

  return res.status(200).json({
    isSuccess: true,
    message: `Product was ${key}.`,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const LIMIT_USERS = 5;
  const page = parseInt(req.query?.page) || 1;

  const users = await User.find({ role: "user" })
    .skip((page - 1) * LIMIT_USERS)
    .limit(LIMIT_USERS);

  const totalUsers = await User.find().countDocuments();

  const totalPages = Math.ceil(totalUsers / LIMIT_USERS);

  return res.status(200).json({
    users,
    totalPages,
    currentPage: page,
    totalUsers,
  });
});

exports.banUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Product not found.");
  }

  user.status = "banned";
  await user.save();

  return res.status(200).json({
    isSuccess: true,
    message: `Account was banned.`,
  });
});

exports.unbanUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Account not found.");
  }

  user.status = "active";
  await user.save();

  return res.status(200).json({
    isSuccess: true,
    message: `Account was unbanned.`,
  });
});
