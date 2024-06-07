const { validationResult } = require("express-validator");
const Bid = require("../models/bidModel");
const catchAsync = require("../utils/catchAsync");

exports.getBids = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) throw new Error("No product found!");
  const bids = await Bid.find({ productId })
    .populate("buyerId", "name")
    .select("text phone_number createdAt")
    .sort({ createdAt: -1 });

  if (!bids || bids.length === 0) {
    throw new Error("No bids are not placed yet.");
  }

  return res.status(200).json({
    isSuccess: true,
    bids,
  });
});

exports.placeBid = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  const { productId, text, phone_number, sellerId } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0].msg,
    });
  }

  if (sellerId === req.user._id) {
    throw new Error("Authorization Failed.");
  }

  await Bid.create({
    productId,
    text,
    phone_number,
    sellerId,
    buyerId: req.user._id,
  });

  return res.status(201).json({
    isSuccess: true,
    message: "Your bid is placed.",
  });
});
