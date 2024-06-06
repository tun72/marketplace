const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

// router
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const publicRouter = require("./routes/publicRoute");

//controller
const errorController = require("./controllers/errorController");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(suffix);
    cb(null, suffix + "-" + file.originalname);
  },
});

const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).array(
    "product_images"
  )
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/public", publicRouter);
app.use(errorController);
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then((_) => {
    console.log("database successfully connected ✅");
    app.listen(PORT, () => {
      console.log("Server is running at http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));
