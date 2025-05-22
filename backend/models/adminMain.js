const mongoose = require("mongoose");

const adminMainSchema = mongoose.Schema({
    platFormCharge: {
        type: Number,
        required: true,
        default: 0.0,
    },
    percentGst: {
        type: Number,
        required: true,
        default: 0.0,
    },
    strategicCharge: {
        type: Number,
        required: true,
        default: 0.0,
    },
    outOfCharge: {
        type: Number,
        required: true,
        default: 100,
    },
    discountCharge: {
        type: Number,
        required: true,
        default: 0.0,
    },
    discountTimes: {
        type: Number,
        required: true,
        default: 0.0,
    },
    refererAmount: {
        type: Number,
        required: true,
        default: 0.0,
    },
    couponCodes: [
        {
        type: String,
        required: true,
      },
    ],
    productCategories: [
        {
        type: String,
        required: true,
      },
    ],
    productTopCategories: [
        {
        type: String,
        required: true,
      },
    ],
    madeByUser: {
        type: String,
    },
    
});

let adminMainModel = mongoose.model("adminMain", adminMainSchema);

module.exports = adminMainModel;