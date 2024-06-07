const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/productController");
const bidController = require("../controllers/bidController");

const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("")
  .get(authMiddleware.protect, productController.getProducts)
  .post(
    authMiddleware.protect,
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

    productController.postProducts
  );

router.patch(
  "/:productId/update",
  authMiddleware.protect,
  [
    body("name").trim().notEmpty().withMessage("product name must have."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("product description must have."),
    body("price").trim().notEmpty().withMessage("product price must have."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("product category must have."),
    body("usedFor").trim().notEmpty().withMessage("product usedFor must have."),
    body("details").isArray().withMessage("product details must array."),
  ],
  productController.updateProducts
);
router.delete(
  "/:productId/delete",
  authMiddleware.protect,
  productController.deleteProduct
);

router.get(
  "/:productId/old-data",
  authMiddleware.protect,
  productController.getSingleProduct
);

router
  .route("/:productId/images")
  .get(authMiddleware.protect, productController.getImages)
  .post(authMiddleware.protect, productController.uploadImages);

// Bid
router.route("/bids/:productId").get(bidController.getBids);
router
  .route("/place-bids")
  .post(
    [
      body("text").trim().notEmpty().withMessage("text must have."),
      body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("phone_number must have."),
    ],
    authMiddleware.protect,
    bidController.placeBid
  );

module.exports = router;
