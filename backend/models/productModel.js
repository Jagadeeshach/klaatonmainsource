const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  productUId: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  flatFormCharge: {
    type: Number,
    required: true,
    default: 0.0,
  },
  finalProdPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  strategicPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  prodCorrectSize: {
    shirtCorrectSize: {
      bottShrtWid: {
        type: Number,
        default: 0,
      },
      topShrtWid: {
        type: Number,
        default: 0,
      },
      shirtHigt: {
        type: Number,
        default: 0,
      },
      shirtSleeveLength: {
        type: Number,
        default: 0,
      },
      shirtSleeveTopWidth: {
        type: Number,
        default: 0,
      },
    },
    pantCorrectSize: {
      pantTotalHight: {
        type: Number,
        default: 0,
      },
      pantTotalWidth: {
        type: Number,
        default: 0,
      },
      pantLegBottWidth: {
        type: Number,
        default: 0,
      },
      pantLegToppWidth: {
        type: Number,
        default: 0,
      },
    },
    shoesCorrectSize: {
      type: Number,
      default: 0,
    },
    chappalCorrectSize: {
      type: Number,
      default: 0,
    },
    kurtaCorrectSize: {
      bottKurtWid: {
        type: Number,
        default: 0,
      },
      ToppKurtWid: {
        type: Number,
        default: 0,
      },
      MiddKurtWid: {
        type: Number,
        default: 0,
      },
      KurttHigt: {
        type: Number,
        default: 0,
      },
      KurttHandLength: {
        type: Number,
        default: 0,
      },
      KurttHandWidth: {
        type: Number,
        default: 0,
      },
    },
    churidarCorrectSize: {
      bottChuridWid: {
        type: Number,
        default: 0,
      },
      toppChuridWid: {
        type: Number,
        default: 0,
      },
      middChuridWid: {
        type: Number,
        default: 0,
      },
      churidHeight: {
        type: Number,
        default: 0,
      },
      churidHandLegt: {
        type: Number,
        default: 0,
      },
      churidHandWidth: {
        type: Number,
        default: 0,
      },
    },
    churPantCorrectSize: {
      churPantTotalWid: {
        type: Number,
        default: 0,
      },
      churPantTotalHeight: {
        type: Number,
        default: 0,
      },
      churPantTopWidth: {
        type: Number,
        default: 0,
      },
      churPantBottWidth: {
        type: Number,
        default: 0,
      },
    },
    churLegginCorrectSize: {
      churLegginTotalWid: {
        type: Number,
        default: 0,
      },
      churLegginTotalHeight: {
        type: Number,
        default: 0,
      },
      churLegginTopWidth: {
        type: Number,
        default: 0,
      },
      churLegginBottWidth: {
        type: Number,
        default: 0,
      },
    },
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
      updatedUserName: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  topProdCategory: {
    type: String,
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
}, { timestamps: true });

let schema = mongoose.model("Product", productSchema);

module.exports = schema;

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter product name"],
//     trim: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     default: 0.0,
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter product description"],
//   },
//   ratings: {
//     type: String,
//     default: 0,
//   },
//   images: [
//     {
//       image: {
//         type: String,
//         required: [true, "Product images are required"],
//       },
//       key: {
//         type: String,
//         required: [true, "Image keys are required"],
//       },
//       updatedUserName: {
//         type: String,
//       },
//     },
//   ],
//   category: {
//     type: String,
//     required: [true, "Please enter product category"],
//     enum: {
//       values: [
//         "Formal Shirts",
//         "T-Shirts",
//         "Casual Shirts",
//         "Jeans",
//         "Shorts",
//         "Hoodies",
//         "Sweatshirts",
//         "Designer Shirts",
//         "Party Blazers",
//         "Velvet Jackets",
//         "Ethnic Wear",
//         "Gym & Sports",
//         "Winter Wear",
//       ],
//       message: "Please select correct category",
//     },
//   },
//   seller: {
//     type: String,
//     required: [true, "Please enter product seller"],
//   },
//   stock: {
//     type: Number,
//     required: [true, "Please enter product stock"],
//   },
//   sizesAvailable: {
//     type: [String],
//     required: true,
//   },
//   numOfReviews: {
//     type: Number,
//     default: 0,
//   },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//       rating: {
//         type: String,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// let schema = mongoose.model("Product", productSchema);

// module.exports = schema;
