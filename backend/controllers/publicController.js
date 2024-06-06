const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json(products);
});
