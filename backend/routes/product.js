const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  deleteReview,
  getReviews,
  getAdminProducts,
  getCategoryProducts,
  getSellerProducts,
  updatePriceOfAllProducts,
} = require("../controllers/productController.js");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Only during development-----

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
// Only during development-----

router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct);

router.route("/productcat/:category").get(getCategoryProducts);

router.route("/review").put(isAuthenticatedUser, createReview);

router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    newProduct
  );

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/admin/product/:id")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    updateProduct
  );

router
  .route("/admin/update/price/product/all")
  .put(isAuthenticatedUser, 
    authorizeRoles("admin"), 
    updatePriceOfAllProducts);  

router
  .route("/admin/reviews")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getReviews);
router
  .route("/admin/review")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);


// ------Seller API------
router
  .route("/vendor/products")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProducts);

router
  .route("/vendor/product/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("seller"),
    upload.array("images"),
    newProduct
  );

router
  .route("/vendor/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("seller"), deleteProduct);

router
  .route("/vendor/product/:id")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("seller"),
    upload.array("images"),
    updateProduct
  );

module.exports = router;
