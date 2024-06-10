const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    productId: { require: true, type: String, ref:"Product"},
    userId: { required: true, type: Schema.Types.ObjectId, ref: "User" },
    phoneNumber: { require: true, type: String },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = model("Notification", notificationSchema);

module.exports = notificationModel;