const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

const SavedProduct = require("../models/savedProductModel");

const { validationResult } = require("express-validator");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "tun-s",
  api_key: "661195952569967",
  api_secret: process.env.CLOUD_API,
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id })
    .populate("userId", "name email")
    .sort({
      createdAt: -1,
    });

  return res.status(200).json({
    isSuccess: true,
    products,
  });
});

exports.postProducts = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

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

  const productDoc = await Product.findById(productId);
  if (req.user._id.toString() !== productDoc.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

  const product = await Product.findByIdAndDelete(productId);

  if (!product) throw new Error("ProductId is not deleted");

  if (product.images && Array.isArray(product.images)) {
    const deletePromise = product.images.map((img) => {
      const publicId = img.substring(
        img.lastIndexOf("/") + 1,
        img.lastIndexOf(".")
      );

      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (err, result) => {
          if (err) {
            reject(new Error("Destroy Failed."));
          } else {
            resolve(result);
          }
        });
      });
    });

    await Promise.all(deletePromise);
  }

  return res.status(202).json({
    isSuccess: true,
    message: "Product destroy.",
    product,
  });
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { decodeImgToDelete } = req.params;

  if (!productId) throw new Error("Product Id is required.");

  const productDoc = await Product.findById(productId);

  if (req.user._id.toString() !== productDoc.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

  if (!decodeImgToDelete) throw new Error("Product Image is required.");

  const product = await Product.findByIdAndUpdate(productId, {
    $pull: { images: decodeImgToDelete },
  });

  if (!product) throw new Error("No image was deleted");

  const publicId = decodeImgToDelete.substring(
    decodeImgToDelete.lastIndexOf("/") + 1,
    decodeImgToDelete.lastIndexOf(".")
  );

  await cloudinary.uploader.destroy(publicId);

  return res.status(200).json({
    isSuccess: true,
    message: "Image destroyed.",
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
  const productDoc = await Product.findById(productId);

  if (req.user._id.toString() !== productDoc.userId.toString()) {
    throw new Error("Authorization Failed.");
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

  const productDoc = await Product.findById(productId);

  if (req.user._id.toString() !== productDoc.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

  const images = await Product.findById(productId).select("images");

  return res.status(200).json(images);
});

exports.uploadImages = catchAsync(async (req, res, next) => {
  const productImages = req.files;

  const { productId } = req.params;
  let secureUrlArray = [];

  const productDoc = await Product.findById(productId);

  if (req.user._id.toString() !== productDoc.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

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

// saved products
exports.getSavedProduct = catchAsync(async (req, res, next) => {
  const savedProducts = await SavedProduct.find({ userId: req.user._id })
    .populate("productId")
    .populate("userId");

  return res.status(200).json({ savedProducts, isSuccess: true });
});

exports.savedProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const isExists = await SavedProduct.findOne({
    $and: [{ userId: req.user._id }, { productId: id }],
  });

  if (isExists) {
    throw new Error("Product is already saved.");
  }

  await SavedProduct.create({
    userId: req.user._id,
    productId: id,
  });

  return res.status(200).json({
    isSuccess: true,
    message: "Product Saved.",
  });
});

exports.unSavedProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await SavedProduct.deleteOne({
    productId: id,
    userId: req.user._id,
  });

  return res.status(200).json({
    isSuccess: true,
    message: "Product removed from the list.",
  });
});
