const Notification = require("../models/notificationModel");
const catchASync = require("../utils/catchAsync");

exports.pushNofification = catchASync(async (req, res) => {
  const { message, title, userId, productId, phoneNumber } = req.body;

  await Notification.create({
    title,
    message,
    userId,
    productId,
    phoneNumber,
  });

 

  return res.status(201).json({
    isSuccess: true,
    message: "Notification is pushed.",
  });
});

exports.getNotifications = catchASync(async (req, res) => {
  
  const noti = await Notification.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });

  // if (!noti || noti.length === 0) {
  //   throw new Error("No notifications yet.");
  // }

  return res.status(200).json({
    isSuccess: true,
    noti,
  });
});

exports.markAsRead = catchASync(async (req, res) => {
  const { id } = req.params;

  const noti = await Notification.findById(id);

  if (req.user._id.toString() !== noti.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

  if (!noti) {
    throw new Error("notifications not found.");
  }

  noti.isRead = true;
  noti.save();

  return res.status(200).json({
    isSuccess: true,
    message: "Done.",
  });
});

exports.deleteNoti = catchASync(async (req, res) => {
  const { id } = req.params;

  const noti = await Notification.findById(id);

  if (req.user._id.toString() !== noti.userId.toString()) {
    throw new Error("Authorization Failed.");
  }

  if (!noti) throw new Error("Notification not found");

  await Notification.findByIdAndDelete(noti._id);

  return res.status(200).json({
    isSuccess: true,
    message: "Notification is deleted.",
  });
});

exports.deleteAllNoti = catchASync(async (req, res) => {
  await Notification.deleteMany({ userId: req.user._id });

  return res.status(200).json({
    isSuccess: true,
    message: "Notification are cleared.",
  });
});
