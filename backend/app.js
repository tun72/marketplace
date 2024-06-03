const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// router
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");

//controller
const errorController = require("./controllers/errorController");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
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
