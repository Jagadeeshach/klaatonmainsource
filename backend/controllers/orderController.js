const mongoose = require("mongoose");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const UserModel = require("../models/userModel");
const AdminMainModel = require("../models/adminMain");
const ErrorHandler = require("../utils/errorHandler");


async function generateUniqueOrderCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let uniqueCode;
  let isUnique = false;

  while (!isUnique) {
    const randomLetters =
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)] +
      letters[Math.floor(Math.random() * 26)];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit number
    uniqueCode = `${randomLetters}${randomNumbers}`;

    // Check database for existing productUId
    const existingOrder = await Order.findOne({ orderUId: uniqueCode });
    if (!existingOrder) {
      isUnique = true;
    }
  }

  return uniqueCode;
}

//Create New Order - /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const userFind = await UserModel.findById(req.user.id);
  const userEmail = userFind.email;
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    totalPrice,
    actualItemsPrice,
    baseSellerPriceTotalRounded,
    paymentInfo,
    discountDetails,
  } = req.body;
  

  const safeDiscountDetails = discountDetails || {};
        safeDiscountDetails.userEmail = userEmail;

  orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  const orderCodeGenerate = await generateUniqueOrderCode();

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    totalPrice,
    actualItemsPrice,
    discountDetails: safeDiscountDetails,
    baseSellerPriceTotalRounded,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
    orderUId: orderCodeGenerate,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Single Order - /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Loggedin User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5; 
  const skip = (page - 1) * limit;

  const totalOrders = await Order.countDocuments({ user: req.user.id });

  const orders = await Order.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    orders,
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
    totalOrders,
  });
});

//Admin: Get All Orders - /api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => { 
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalOrders = await Order.countDocuments();

  const orders = await Order.find()
    .populate({
      path: "orderItems.sellerId",
      select: "name email",
    })
    .sort({ updatedAt: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  let totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    totalOrders,
    pages: Math.ceil(totalOrders / limit),
    currentPage: page,
  });
});

//Admin: Update Order / Order Status - api/v1/order/:id

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let allItemsDelivered = true;
    let orderStatuses = new Set();

    for (const item of order.orderItems) {
      if (user.role === "admin") {
        item.orderStatus = req.body.orderStatus;
      } else if (item.sellerId.toString() === req.user.id) {
        if (item.orderStatus === "Delivered") {
          return res.status(400).json({
            success: false,
            message: `Order has already been delivered and cannot be updated.`,
          });
        }
        item.orderStatus = req.body.orderStatus;
      }
      orderStatuses.add(item.orderStatus);

      if (item.orderStatus !== "Delivered") {
        allItemsDelivered = false;
      }
    }

    if (allItemsDelivered) {
      order.deliveredAt = Date.now();
    }

    // Update userOrderStatus only if all items share the same status
    if (orderStatuses.size === 1) {
      order.userOrderStatus = [...orderStatuses][0];
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// exports.updateOrder = catchAsyncError(async (req, res, next) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     const user = await UserModel.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let allItemsDelivered = true;
//     let statusSet = new Set();

//     for (const item of order.orderItems) {
//       if (user.role === "admin") {
//         // Admin can update any item's status
//         item.orderStatus = req.body.orderStatus;
//       } else if (item.sellerId.toString() === req.user.id) {
//         if (item.orderStatus === "Delivered") {
//           console.warn(`Order item ${item._id} has already been delivered!`);
//           continue; // Skip this item, but process others
//         }
//         item.orderStatus = req.body.orderStatus;
//       }
//       statusSet.add(item.orderStatus);

//       // Normal users cannot change Delivered items, but admins can
//       if (user.role !== "admin" && item.orderStatus !== "Delivered") {
//         allItemsDelivered = false;
//       }
//     }

//     if (allItemsDelivered) {
//       order.deliveredAt = Date.now();
//     }

//     // Determine overall userOrderStatus
//     if (statusSet.size === 1) {
//       order.userOrderStatus = [...statusSet][0]; // All items have the same status
//     } else if (statusSet.has("Shipped")) {
//       order.userOrderStatus = "Shipped";
//     } else if (statusSet.has("Packing")) {
//       order.userOrderStatus = "Packing";
//     } else {
//       order.userOrderStatus = "Processing";
//     }

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// exports.updateOrder = catchAsyncError(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     return next(new ErrorHandler("Order not found", 404));
//   }

//   const user = await UserModel.findById(req.user.id);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   let allItemsDelivered = true;
//   let statusSet = new Set();

//   for (const item of order.orderItems) {
//     if (item.sellerId.toString() === req.user.id) {
//       if (item.orderStatus === "Delivered") {
//         return next(new ErrorHandler("Order item has already been delivered!", 400));
//       }
//       item.orderStatus = req.body.orderStatus;
//     }
//     statusSet.add(item.orderStatus);

//     if (item.orderStatus !== "Delivered") {
//       allItemsDelivered = false;
//     }
//   }

//   if (allItemsDelivered) {
//     order.deliveredAt = Date.now();
//   }

//   // Determine overall userOrderStatus
//   if (statusSet.size === 1) {
//     order.userOrderStatus = [...statusSet][0]; // All items have the same status
//   } else if (statusSet.has("Shipped")) {
//     order.userOrderStatus = "Shipped";
//   } else if (statusSet.has("Packing")) {
//     order.userOrderStatus = "Packing";
//   } else {
//     order.userOrderStatus = "Processing";
//   }

//   await order.save();

//   res.status(200).json({
//     success: true,
//     message: "Order status updated successfully",
//     order,
//   });
// });

// exports.updateOrder = catchAsyncError(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     return next(new ErrorHandler("Order not found", 404));
//   }

//   const user = await UserModel.findById(req.user.id);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   let allItemsDelivered = true;
//   let statusSet = new Set();

//   order.orderItems.forEach((item) => {
//     if (item.sellerId.toString() === req.user.id) {
//       if (item.orderStatus === "Delivered") {
//         return next(new ErrorHandler("Order item has already been delivered!", 400));
//       }

//       item.orderStatus = req.body.orderStatus;
//     }
//     statusSet.add(item.orderStatus);

//     if (item.orderStatus !== "Delivered") {
//       allItemsDelivered = false;
//     }
//   });

//   if (allItemsDelivered) {
//     order.deliveredAt = Date.now();
//   }

//   // Determine overall userOrderStatus
//   if (statusSet.size === 1) {
//     order.userOrderStatus = [...statusSet][0]; // All items have the same status
//   } else if (statusSet.has("Shipped")) {
//     order.userOrderStatus = "Shipped";
//   } else if (statusSet.has("Packing")) {
//     order.userOrderStatus = "Packing";
//   } else {
//     order.userOrderStatus = "Processing";
//   }

//   await order.save();

//   res.status(200).json({
//     success: true,
//     message: "Order status updated successfully",
//     order,
//   });
// });

// exports.updateOrder = catchAsyncError(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     return next(new ErrorHandler("Order not found", 404));
//   }

//   const user = await UserModel.findById(req.user.id);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   if (user.role === "seller" && order.orderStatus === "Delivered") {
//     return next(new ErrorHandler("Order has already been delivered!", 400));
//   }

//   order.orderItems.orderStatus = req.body.orderStatus;

//   if (req.body.orderStatus === "Delivered") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save();

//   res.status(200).json({
//     success: true,
//     message: "Order status updated successfully",
//     order,
//   });
// });

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`)
    );
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

exports.getAdminProductsAndOrderData = catchAsyncError(async (req, res, next) => {
  try {
      const products = await Product.find();
      const orders = await Order.find();

      const productCount = products.length;
      const outOfStockCount = products.filter(product => product.stock === 0).length;
      
      let totalOrderAmount = 0;
      orders.forEach(order => {
          const finalAmount = order.discountDetails?.finalAmountAfterDiscount;
          totalOrderAmount += finalAmount !== null && finalAmount !== undefined
              ? finalAmount
              : order.totalPrice || 0;
      });

      const totalOrders = orders.length;

      const adminData = {
          productCount,
          outOfStockCount,
          totalOrderAmount,
          totalOrders
      };

      res.status(200).json({
          success: true,
          adminData
      });
  } catch (error) {
      next(error);
  }
});

exports.userOrderCancelOrReturnFunc = catchAsyncError(async (req, res, next) => {
  const { userActId, orderId } = req.params;
  const { userOrderValue } = req.body;

  const existingOrder = await Order.findOne({ _id: orderId, user: userActId });

  if (!existingOrder) {
    return next(new ErrorHandler("Order not found or user mismatch", 404));
  }

  if (!["Cancel", "Return"].includes(userOrderValue)) {

    if(existingOrder.userOrderCancel  === "Cancel"){
      return next(new ErrorHandler("Order has already been cancelled and cannot be changed.", 400));
    } else {
      return next(new ErrorHandler("Invalid userOrderValue. Must be 'Cancel' or 'Return'.", 400));
    }
    
  }

  if (existingOrder.userOrderCancel === "Cancel") {
    return next(new ErrorHandler("Order has already been cancelled and cannot be changed.", 400));
  }

  if (userOrderValue === "Return") {
    const deliveredAt = existingOrder.deliveredAt;
    if (!deliveredAt) {
      return next(new ErrorHandler("Order has not been delivered yet.", 400));
    }

    
    const istOptions = { timeZone: 'Asia/Kolkata' };
    const deliveredIST = new Date(deliveredAt.toLocaleString("en-US", istOptions));
    const nowIST = new Date(new Date().toLocaleString("en-US", istOptions));

    const deliveredDateOnly = new Date(
      deliveredIST.getFullYear(),
      deliveredIST.getMonth(),
      deliveredIST.getDate()
    );

    const nowDateOnly = new Date(
      nowIST.getFullYear(),
      nowIST.getMonth(),
      nowIST.getDate()
    );

    const diffInMs = nowDateOnly - deliveredDateOnly;
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

    // console.log("Delivered Date (IST):", deliveredDateOnly);
    // console.log("Now Date (IST):", nowDateOnly);
    // console.log("diffInMs", diffInMs);

    if (diffInMs < 0) {
      return next(new ErrorHandler("Order has not been delivered yet.", 400));
    }

    if (diffInMs > twoDaysInMs) {
      return next(new ErrorHandler("Return window has expired. Orders can only be returned within 2 days of delivery.", 400));
    }
  }

  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId, user: userActId },
    { userOrderCancel: userOrderValue },
    { new: true }
  );

  if (["Cancel", "Return"].includes(updatedOrder.userOrderCancel)) {
    updatedOrder.userOrderStatus = updatedOrder.userOrderCancel;
  
    updatedOrder.orderItems.forEach(item => {
      item.orderStatus = updatedOrder.userOrderCancel;
    });
  
   await updatedOrder.save();
  }
  

  res.status(200).json({
    message: userOrderValue === "Cancel" ? "Order has been cancelled" : "Order has been returned",
    order: updatedOrder,
  });
});

//-----seller api-----

exports.getSellerProductsAndOrdersData = catchAsyncError(async (req, res, next) => {
  try {
    const sellerId = req.user.id;

    // Fetch products of the seller
    const products = await Product.find({ user: sellerId });

    // Fetch orders that contain items from this seller
    const orders = await Order.find({ "orderItems.sellerId": sellerId });

    // Calculate total out-of-stock products
    const totalSellerProducts = products.length;
    const totalSellerOutOfStock = products.filter(product => product.stock === 0).length;

    // Calculate total order amount for the seller based on order items
    const totalSellerOrderAmount = orders.reduce((sum, order) => {
      const sellerItemsTotal = order.orderItems
        .filter(item => item.sellerId.toString() === sellerId) 
        .reduce((itemSum, item) => itemSum + (item.quantity * (item.baseSellerPrice || 0)), 0); 
      
      return sum + sellerItemsTotal;
    }, 0);

    // Total number of orders containing seller's products
    const totalSellerOrders = orders.length;

    // Prepare response data
    const sellerData = {
      totalSellerProducts,
      totalSellerOutOfStock,
      totalSellerOrderAmount,
      totalSellerOrders
    };

    res.status(200).json({
      success: true,
      sellerData
    });
  } catch (error) {
    next(error);
  }
});

// exports.getSellerProductsAndOrdersData = catchAsyncError(async (req, res, next) => { 
//   try {
//       const products = await Product.find({ user: req.user.id });
//       const orders = await Order.find({ "orderItems.sellerId": req.user.id });

//       const totalSellerProducts = products.length;
//       const totalSellerOutOfStock = products.filter(product => product.stock === 0).length;

//       const totalSellerOrderAmount = orders.reduce((sum, order) => 
//           sum + (order.baseSellerPriceTotalRounded || 0), 0
//       );

//       const totalSellerOrders = orders.length;

//       const sellerData = {
//           totalSellerProducts,
//           totalSellerOutOfStock,
//           totalSellerOrderAmount,
//           totalSellerOrders
//       };

//       res.status(200).json({
//           success: true,
//           sellerData
//       });
//   } catch (error) {
//       next(error);
//   }
// });

exports.sellerOrders = catchAsyncError(async (req, res, next) => {
  const sellerId = new mongoose.Types.ObjectId(req.user.id);
  
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalOrders = await Order.countDocuments({ "orderItems.sellerId": sellerId });

  const orders = await Order.find({ "orderItems.sellerId": sellerId })
    .sort({ updatedAt: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  let totalAmount = 0;

  const filteredOrders = orders.map((order) => {
    const sellerItems = order.orderItems.filter((item) =>
      item.sellerId.equals(sellerId)
    );

    const sellerTotal = sellerItems.reduce(
      (acc, item) => acc + item.baseSellerPrice * item.quantity,
      0
    );

    totalAmount += sellerTotal;

    return {
      ...order._doc,
      orderItems: sellerItems,
      totalPrice: sellerTotal,
      orderStatus: sellerItems.length ? sellerItems[0].orderStatus : "Processing", 
    };
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders: filteredOrders,
    totalOrders,
    pages: Math.ceil(totalOrders / limit),
    currentPage: page,
  });
});


// exports.sellerOrders = catchAsyncError(async (req, res, next) => {
//   const sellerId = new mongoose.Types.ObjectId(req.user.id);
  
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const skip = (page - 1) * limit;

  
//   const totalOrders = await Order.countDocuments({ "orderItems.sellerId": sellerId });

  
//   const orders = await Order.find({ "orderItems.sellerId": sellerId })
//     .sort({ updatedAt: -1, createdAt: -1 })
//     .skip(skip)
//     .limit(limit);

//   let totalAmount = 0;

//   const filteredOrders = orders.map((order) => {
//     const sellerItems = order.orderItems.filter((item) =>
//       item.sellerId.equals(sellerId) 
//     );

//     const sellerTotal = sellerItems.reduce(
//       (acc, item) => acc + item.baseSellerPrice * item.quantity,
//       0
//     );

//     totalAmount += sellerTotal;

//     return {
//       ...order._doc,
//       orderItems: sellerItems,
//       totalPrice: sellerTotal, 
//     };
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders: filteredOrders,
//     totalOrders,
//     pages: Math.ceil(totalOrders / limit),
//     currentPage: page,
//   });
// });

// exports.sellerOrders = catchAsyncError(async (req, res, next) => {
//   const sellerId = new mongoose.Types.ObjectId(req.user.id);

//   // Fetch orders where the seller exists in orderItems
//   const orders = await Order.find({ "orderItems.sellerId": sellerId }).sort({
//     createdAt: -1,
//   });

//   let totalAmount = 0;

//   const filteredOrders = orders.map((order) => {
//     const sellerItems = order.orderItems.filter((item) =>
//       item.sellerId.equals(sellerId) // Properly compare ObjectId
//     );

//     const sellerTotal = sellerItems.reduce(
//       (acc, item) => acc + item.baseSellerPrice * item.quantity,
//       0
//     );

//     totalAmount += sellerTotal;

//     return {
//       ...order._doc,
//       orderItems: sellerItems,
//       totalPrice: sellerTotal, // Show only the relevant seller's total
//     };
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders: filteredOrders,
//   });
// });

exports.getSellerSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
  }

  // Filter orderItems for the specific seller
  const filteredItems = order.orderItems.filter(item => item.sellerId?.toString() === req.user.id);

  if (filteredItems.length === 0) {
    return next(new ErrorHandler("No items found for this seller in this order", 404));
  }

  // Calculate grandTotal (price * quantity for each item)
  const grandTotal = filteredItems.reduce((total, item) => total + item.baseSellerPrice * item.quantity, 0);

  const orderObject = order.toObject(); // Convert Mongoose document to a plain JS object
  orderObject.orderItems = filteredItems; // Only return filtered items
  orderObject.grandTotal = grandTotal; // Add grandTotal inside order

  res.status(200).json({
    success: true,
    order: orderObject, // Return the modified order object
  });
});

exports.getOrderDiscount = catchAsyncError(async (req, res, next) => {
  const userFind = await UserModel.findById(req.user.id);
  const orderArray = await Order.find();
  // const orderArray = await Order.find().populate('user', 'name email');
  const discountModel = await AdminMainModel.findOne().sort({ createdAt: -1 });

  const { amount, couponCode } = req.body;

  const discountRate = discountModel.discountCharge;
  const discountTimes = discountModel.discountTimes;
  const maxRate = discountModel.outOfCharge;
  const couponCodes = discountModel.couponCodes;

  const discountPercent = `${discountRate}%`;

  const userEmail = userFind.email;

  // Count how many times this email has used the given coupon code
  const userCouponCount = orderArray.filter(order => 
    order.discountDetails.userEmail === userEmail && order.discountDetails.discountCouponCode === couponCode
  ).length;

  if ( userCouponCount >= discountTimes ) {
    return res.status(400).json({
      success: false,
      message: `This coupon has used ${discountTimes} times!`,
    });
  }

  // Validate the coupon code
  if (!couponCodes.includes(couponCode)) {
    return res.status(400).json({
      success: false,
      message: "Invalid coupon code.",
    });
  }

  // Calculate the discount and final amount
  const discountAmountAvailable = Math.round((amount * discountRate) / maxRate);
  const finalAmountAfterDiscount = Math.round(amount - discountAmountAvailable);

  const finalData = {
    finalAmountAfterDiscount,
    discountAmountAvailable,
    amount,
    couponCode,
    discountPercent,
    userEmail,
  };

  res.status(200).json({
    success: true,
    finalData
  });
});

exports.myUserReferenceCount = catchAsyncError(async (req, res, next) => {
  
  const user = await UserModel.findById(req.user.id);
  if (!user) {
      return next(new ErrorHandler("User not found", 404));
  }
  
  const referenceModel = await AdminMainModel.findOne().sort({ createdAt: -1 });
  const referAmountPerSuccessfulOrder = referenceModel.refererAmount;

  
  const orders = await Order.find();

  
  const myReferedOrders = orders.filter(
    (order) => 
        order.discountDetails?.discountCouponCode === user.userCouponCode &&
        order.orderStatus === "Delivered"
  );

  
  const numberOfMyReference = myReferedOrders.length;
  const referEarnedAmount = Math.round((numberOfMyReference || 0) * referAmountPerSuccessfulOrder);
  const myReferCode = user.userCouponCode;

  const referInfo = {
    referEarnedAmount,
    numberOfMyReference,
    myReferCode
  };

  res.status(200).json({
    success: true,
    referInfo,
  }); 
});

// Backup controllers
// exports.myOrders = catchAsyncError(async (req, res, next) => {
//   const orders = await Order.find({ user: req.user.id }).sort({
//     createdAt: -1,
//   });

//   res.status(200).json({
//     success: true,
//     orders,
//   });
// });
// -------------------------

// exports.orders = catchAsyncError(async (req, res, next) => {
//   const orders = await Order.find()
//     .populate({
//       path: "orderItems.sellerId",
//       select: "name email",
//     })
//     .sort({ createdAt: -1 });

//   let totalAmount = 0;
//   orders.forEach((order) => {
//     totalAmount += order.totalPrice;
//   });

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders,
//   });
// });