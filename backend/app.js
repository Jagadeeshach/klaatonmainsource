const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
//     abortOnLimit: true,
//     createParentPath: true, // Creates the folder if it doesn't exist
//   })
// );

const products = require("./routes/product.js");
const auth = require("./routes/auth.js");
const order = require("./routes/order.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const ad = require("./routes/ad.js");
const adminMain = require("./routes/adminroutesMain.js");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
app.use("/api/v1/", paymentRoutes);
app.use("/api/v1/", ad);
app.use("/api/v1/", adminMain);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
