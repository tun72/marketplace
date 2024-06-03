const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
exports.getProducts = (req, res, next) => {};

exports.postProducts = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  console.log(req.user);
  const product = await Product.create({ ...req.body, userId: req.user._id });

  return res.status(201).json({
    isSuccess: true,
    message: "Product added to sell list.",
    product,
  });
});
