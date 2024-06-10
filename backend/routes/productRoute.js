const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const productController = require("../controllers/productController");
const bidController = require("../controllers/bidController");
const notificationController = require("../controllers/notificationController");

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

router.delete(
  "/delete-image/:productId/:decodeImgToDelete",
  authMiddleware.protect,
  productController.deletePhoto
);

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

router.get(
  "/saved-products",
  authMiddleware.protect,
  productController.getSavedProduct
);

router.post(
  "/saved-products/:id",
  authMiddleware.protect,
  productController.savedProduct
);

router.delete(
  "/saved-products/:id",
  authMiddleware.protect,
  productController.unSavedProduct
);

//  notification
router.post(
  "/notify",
  authMiddleware.protect,
  notificationController.pushNofification
);

router.get(
  "/notifications",
  authMiddleware.protect,
  notificationController.getNotifications
);

router.post(
  "/notification/:id/mark-read",
  authMiddleware.protect,
  notificationController.markAsRead
);

router.delete(
  "/notification/:id/delete",
  authMiddleware.protect,
  notificationController.deleteNoti
);

router.delete(
  "/notification/delete/all",
  authMiddleware.protect,
  notificationController.deleteAllNoti
);

module.exports = router;
