const mongoose = require("mongoose");

const { Schema } = mongoose;

const BidSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    sellerId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    buyerId: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    text: {
      required: true,
      type: String,
    },
    phone_number: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model("Bid", BidSchema);

module.exports = Bid;
