const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    ordererName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  orderUId: {
    type: String,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      selSizes: {
        type: String,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      actualPrice: {
        type: Number,
        required: true,
      },
      baseSellerPrice: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Product",
      },
      sellerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
      productUId: {
        type: String,
      },
      orderStatus: {
        type: String,
        default: "Processing",
      },
    },
  ],
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  actualItemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  discountDetails: {
    userEmail: {
      type: String,
    },
    discountPercent : {
      type: String,
    },
    discountCouponCode : {
      type: String,
    },
    enteredAmount : {
      type: Number,
    },
    discountAmount : {
      type: Number,
    },
    finalAmountAfterDiscount: {
      type: Number,
    },
  },
  baseSellerPriceTotalRounded: {
    type: Number,
    required: true,
    default: 0.0,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
  },
  userOrderStatus: {
    type: String,
    default: "Processing",
  },
  userOrderCancel: {
    type: String,
    default: "Not Cancelled/Returned"
  },
  deliveredAt: {
    type: Date,
  },
}, { timestamps: true });

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
