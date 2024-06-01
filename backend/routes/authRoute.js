const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ min: 3 })
      .withMessage("Name must at least 3 characters long."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must have.")
      .isLength({ min: 5 })
      .withMessage("Password must at least 5 characters."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.register
);
router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must have.")
      .isLength({ min: 5 })
      .withMessage("Password must at least 5 characters."),
    body("email").trim().isEmail().withMessage("Please enter a vaild E-mail !"),
  ],
  authController.login
);

module.exports = router;
