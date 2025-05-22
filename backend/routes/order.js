const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
  sellerOrders,
  getSellerSingleOrder,
  getOrderDiscount,
  myUserReferenceCount,
  getAdminProductsAndOrderData,
  getSellerProductsAndOrdersData,
  userOrderCancelOrReturnFunc,
} = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/myorders").get(isAuthenticatedUser, myOrders);

router.route("/order/cancel/return/:orderId/:userActId").put(isAuthenticatedUser, userOrderCancelOrReturnFunc);

router.route("/discount/coupon").post(isAuthenticatedUser, getOrderDiscount);

//Admin Routes
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), orders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteOrder
  );

router
  .route("/admin/orders-products-data")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProductsAndOrderData);

// -----seller orders------

router
  .route("/vendor/orders")
  .get(isAuthenticatedUser, authorizeRoles("seller"), sellerOrders);

router
  .route("/vendor/products-orders-data")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProductsAndOrdersData);

router
  .route("/vendor/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("seller"), updateOrder)
  .delete(
    isAuthenticatedUser,
    authorizeRoles("seller"),
    deleteOrder
  );  
  
router.route("/vendor/order/:id").get(isAuthenticatedUser, getSellerSingleOrder);

// -----Delivery Team API-----

router.route("/myrefer/orders").get(isAuthenticatedUser, authorizeRoles("deliveryboy"), myUserReferenceCount);

module.exports = router;
