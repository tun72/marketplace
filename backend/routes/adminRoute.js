const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/products")
  .get(authMiddleware.protect, adminController.getAllProducts);

router.route("/users").get(authMiddleware.protect, adminController.getAllUsers);

router.post(
  "/products/:productId/manage",
  authMiddleware.protect,
  adminController.approveProduct
);

router.post(
  "/users/:userId/ban",
  authMiddleware.protect,
  adminController.banUser
);

router.post(
  "/users/:userId/unban",
  authMiddleware.protect,
  adminController.unbanUser
);
module.exports = router;
