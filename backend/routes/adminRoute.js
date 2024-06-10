const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router
  .route("/products")
  .get(
    authMiddleware.protect,
    adminMiddleware.isAdmin,
    adminController.getAllProducts
  );

router
  .route("/users")
  .get(
    authMiddleware.protect,
    adminMiddleware.isAdmin,
    adminController.getAllUsers
  );

router.post(
  "/products/:productId/manage",
  authMiddleware.protect,
  adminMiddleware.isAdmin,
  adminController.approveProduct
);

router.post(
  "/users/:userId/ban",
  authMiddleware.protect,
  adminMiddleware.isAdmin,
  adminController.banUser
);

router.post(
  "/users/:userId/unban",
  authMiddleware.protect,
  adminMiddleware.isAdmin,
  adminController.unbanUser
);
module.exports = router;
