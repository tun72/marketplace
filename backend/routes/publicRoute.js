const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const publicController = require("../controllers/publicController");


router.route("/products").get(publicController.getAllProducts);
router.route("/product/:productId").get(publicController.getProductDetail);

module.exports = router;
