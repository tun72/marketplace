const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "tun-s",
  api_key: "661195952569967",
  api_secret: process.env.CLOUD_API,
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().populate("userId", "name email").sort({
    createdAt: -1,
  });

  return res.status(200).json({
    isSuccess: true,
    products,
  });
});

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

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) throw new Error("ProductID is required");

  const product = await Product.findById(productId);
  return res.status(200).json({
    isSuccess: true,
    message: "Success ✅",
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) throw new Error("ProductID is required");

  const product = await Product.findByIdAndDelete(productId);

  if (!product) throw new Error("ProductID is not deleted");

  return res.status(202).json({
    isSuccess: true,
    message: "Product destroy.",
    product,
  });
});

exports.updateProducts = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  const { productId } = req.params;
  if (!productId) throw new Error("ProductID is required");

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  const product = await Product.findByIdAndUpdate(productId, { ...req.body });

  return res.status(200).json({
    isSuccess: true,
    message: "Product successfully updated.",
    product,
  });
});

exports.getImages = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) throw new Error("ProductID is required");

  const images = await Product.findById(productId).select("images");
  

  return res.status(200).json(images); 
});

exports.uploadImages = catchAsync(async (req, res, next) => {
  const productImages = req.files;

  const { productId } = req.params;
  let secureUrlArray = [];
  productImages.forEach((img) => {
    cloudinary.uploader.upload(img.path, async (err, result) => {
      if (!err) {
        const url = result.secure_url;
        secureUrlArray.push(url);

        if (productImages.length === secureUrlArray.length) {
          await Product.findByIdAndUpdate(productId, {
            $push: { images: secureUrlArray },
          });
          return res.status(200).json({
            isSuccess: true,
            message: "Product images saved.",
            secureUrlArray,
          });
        }
      } else {
        next("Cloud upload Failed.");
      }
    });
  });
});
