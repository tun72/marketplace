const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("")
  .get()
  .post(
    [
      body("name")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Name must be at least 5 characters long."),
      body("description")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 5 characters long."),
      body("price").notEmpty().withMessage("Price is required"),
      body("category")
        .trim()
        .notEmpty()
        .withMessage("product category must have."),
      body("usedFor")
        .trim()
        .notEmpty()
        .withMessage("product usedFor must have."),
      body("details").isArray().withMessage("product details must array."),
    ],
    authMiddleware.protect,
    productController.postProducts
  );

module.exports = router;
