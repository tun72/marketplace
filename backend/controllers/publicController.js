const Product = require("../models/productModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const LIMIT_PRODUCTS = 6;

  const { page } = req.query || 1;

  const { searchKey, category } = req.query;
  const query = {status: "approve"};

  if (searchKey) {
    query.name = { $regex: searchKey, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  let products = await Product.find(query)
    .skip((page - 1) * LIMIT_PRODUCTS)
    .limit(LIMIT_PRODUCTS);

  const totalProducts = await Product.find({
    status: "approve",
  }).countDocuments();

  const totalPages = Math.ceil(totalProducts / LIMIT_PRODUCTS);

  return res.status(200).json({
    products,
    totalPages,
    currentPage: page,
    totalProducts,
    isSuccess: true,
  });
});

exports.getProductDetail = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) throw new Error("No product Id");

  const product = await Product.findById(productId).populate(
    "userId",
    "name email"
  );

  return res.status(200).json(product);
});
