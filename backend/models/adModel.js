const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  mainAd: {
    mainImages: [
      {
        image: {
          type: String,
          required: [true, "Ad images are required"],
        },
        key: {
          type: String,
          required: [true, "Image keys are required"],
        },
        updatedUserName: {
          type: String,
        },
      },
    ],
    title: {
      type: String,
      required: [true, "Please enter ad title"],
    },
    description: {
      type: String,
      required: [true, "Please enter ad description"],
    },
  },
  secMainAd: {
    secImages: [
      {
        image: {
          type: String,
          required: [true, "Ad images are required"],
        },
        key: {
          type: String,
          required: [true, "Image keys are required"],
        },
        updatedUserName: {
          type: String,
        },
      },
    ],
    secTitle: {
      type: String,
      required: [true, "Please enter ad title"],
    },
    secDescription: {
      type: String,
      required: [true, "Please enter ad description"],
    },
  },
  trendProducts: {
    formals: {
      formalImage: {
        image: {
          type: String,
          required: [true, "Formal image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      formalTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      formalCategory: {
        type: String,
      },
    },
    casuals: {
      casualImage: {
        image: {
          type: String,
          required: [true, "Casual image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      casualTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      casualCategory: {
        type: String,
      },
    },
    shoes: {
      shoesImage: {
        image: {
          type: String,
          required: [true, "Shoes image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      shoesTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      shoesCategory: {
        type: String,
      },
    },
    hoodies: {
      hoodiesImage: {
        image: {
          type: String,
          required: [true, "Hoodies image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      hoodiesTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      hoodiesCategory: {
        type: String,
      },
    },
    capps: {
      cappsImage: {
        image: {
          type: String,
          required: [true, "Formal image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      cappsTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      cappsCategory: {
        type: String,
      },
    },
    shirts: {
      shirtsImage: {
        image: {
          type: String,
          required: [true, "Formal image is required"],
        },
        key: {
          type: String,
          required: [true, "Image key is required"],
        },
        updatedUserName: {
          type: String,
        },
      },
      shirtsTitle: {
        type: String,
        required: [true, "Please provide title"],
      },
      shirtsCategory: {
        type: String,
      },
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let adModel = mongoose.model("Ad", adSchema);

module.exports = adModel;
