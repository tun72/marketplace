const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },

    description: {
      required: true,
      type: String,
    },
    price: {
      reqired: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    usedFor: {
      required: true,
      type: String,
    },
    details: {
      type: Array,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);


