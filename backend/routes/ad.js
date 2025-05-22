const express = require("express");
const router = express.Router();
const {
  newAd,
  getAds,
  getSingleAd,
  updateAd,
  deleteAd,
} = require("../controllers/adController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router
  .route("/admin/ad/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newAd);

router
  .route("/admin/ads")
  .get(getAds);

router
  .route("/admin/ad/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleAd);

router
  .route("/admin/ad/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateAd);

router
  .route("/admin/ad/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAd);

module.exports = router;
