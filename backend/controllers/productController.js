const { v4: uuidv4 } = require("uuid");
const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
const AdminMainModl = require("../models/adminMain");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
const { putObject } = require("../utils/putObject.js");
const { deleteObject } = require("../utils/deleteObject.js");
const { getObject } = require("../utils/getObject.js");
const natural = require("natural");
const synonyms = require("synonyms");

//Get Products - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const resPerPage = 8;
  let { keyword, page = 1 } = req.query;

  let searchRegex = new RegExp(".*", "i"); // Default: match everything

  // Apply typo correction and synonym expansion if a keyword exists
  if (keyword) {
    searchRegex = enhanceSearchQuery(keyword);
  }

  // console.log("Final Search Regex:", searchRegex); // Debugging

  // Get the total number of filtered products
  const filteredProductsCount = await Product.countDocuments({
    stock: { $gt: 0 },
    description: searchRegex,
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredProductsCount / resPerPage);
  const skip = (page - 1) * resPerPage;

  let products = await Product.aggregate([
    {
      $match: { stock: { $gt: 0 }, description: searchRegex }, // Filter products
    },
    {
      $addFields: {
        matchScore: {
          $size: {
            $setIntersection: [
              { $split: ["$description", " "] }, // Split description into words
              keyword.split(" "), // Split user query into words
            ],
          },
        },
      },
    },
    { $sort: { matchScore: -1 } }, // Prioritize products with more keyword matches
    { $skip: skip }, // Apply correct skipping for pagination
    { $limit: resPerPage }, // Limit results per page
  ]);

  res.status(200).json({
    success: true,
    count: filteredProductsCount,
    totalPages,
    currentPage: Number(page),
    resPerPage,
    products,
  });
};

// Function to enhance search query with typo handling & synonyms
function enhanceSearchQuery(query) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(query);

  let enhancedWords = [];

  words.forEach((word) => {
    let variations = new Set();
    variations.add(word); 

    
    let wordSynonyms = synonyms(word, "n");
    if (wordSynonyms) {
      wordSynonyms.forEach((syn) => variations.add(syn));
    }

    
    getTypoVariations(word).forEach((typo) => variations.add(typo));

    enhancedWords.push([...variations].join("|")); 
  });

  return new RegExp(enhancedWords.join(" "), "i"); 
}


function getTypoVariations(word) {
  const typoVariations = [];

  if (word.length > 2) {
    
    for (let i = 0; i < word.length; i++) {
      typoVariations.push(word.slice(0, i) + word.slice(i + 1));
    }
  }

  return typoVariations;
}

//Create Product - /api/v1/product/new
// exports.newProduct = catchAsyncError(async (req, res, next) => {
//   try {
//     const { name, price, description, category, seller, stock, myUser, setSizesAvailable } =
//       req.body;
//     const images = req.files.images; // Assuming 'images' is an array of files
//     const updatedByUser = "Created-" + myUser;

//     if (
//       !name ||
//       !description ||
//       !images ||
//       !price ||
//       !category ||
//       !seller ||
//       !stock ||
//       !setSizesAvailable
//     ) {
//       return res.status(400).json({
//         status: "error",
//         message: "All fields are required",
//       });
//     }

//     if (name.length > 20) {
//       return res.status(400).json({
//         status: "error",
//         message: "Name should not exceed 20 characters",
//       });
//     }

//     if (stock > 20) {
//       return res.status(400).json({
//         status: "error",
//         message: "Stock cannot exceed 20",
//       });
//     }
//     // Initialize arrays to hold image objects and key objects
//     const imageObjects = [];
//     // const keyObjects = [];

//     // Ensure images is an array for consistent processing
//     const imagesArray = Array.isArray(images) ? images : [images];

//     // Loop through each image and upload it to S3
//     for (let i = 0; i < imagesArray.length; i++) {
//       const uniqueFileName = `images/${uuidv4()}`; // Generate a unique file name
//       const { url, key } = await putObject(imagesArray[i].data, uniqueFileName);

//       if (!url || !key) {
//         return res.status(400).json({
//           status: "error",
//           data: `Image upload failed for image ${i + 1}`,
//         });
//       }

//       imageObjects.push({
//         image: url,
//         key: key,
//         updatedUserName: updatedByUser,
//       }); // Wrap the URL in an object as per the schema
//     }

//       const sizesArray = setSizesAvailable.split(',').map(size => size.trim());
//       //const finalArray = sizesArray.map(size => size.slice(0, -1));

//     // Create a new product with the structured data
//     const product = await Product.create({
//       name,
//       price,
//       description,
//       category,
//       seller,
//       stock,
//       sizesAvailable: sizesArray,
//       images: imageObjects,
//     });

//     return res.status(201).json({
//       status: "success",
//       data: product,
//     });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ status: "error", data: "Internal server error" });
//   }
// });

//Get Single Product - get /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "reviews.user",
      "name email"
    );

    if (!product) {
      return next(new ErrorHandler("Product not found", 404)); // Return 404 for not found
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error); // In case of database errors or invalid ID format
  }
};

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const { category } = req.params; 

    // const products = await Product.find({ category });
    const products = await Product.find({ topProdCategory: category });

    if (!products || products.length === 0) {
      return next(new ErrorHandler("Products not found", 404));
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(err); 
  }
};

//Update Product - put /api/v1/product/:id
// exports.updateProduct = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { name, price, description, category, seller, stock, myUser, setSizesAvailable } =
//       req.body;

//     if (name.length > 20) {
//       return res.status(400).json({
//         status: "error",
//         message: "Name should not exceed 20 characters",
//       });
//     }

//     if (stock > 20) {
//       return res.status(400).json({
//         status: "error",
//         message: "Stock cannot exceed 20",
//       });
//     }
//     const images = req.files ? req.files.images : null;

//     const updatedByUser = "Updated-" + myUser;

//     // Find the existing product
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }
//     // Initialize updatedImages with existing images
//     let updatedImages = [...(product.images || [])];

//     if (images) {
//       // Ensure images is always an array for consistent processing
//       const newImages = Array.isArray(images) ? images : [images];

//       // Replace images one-to-one with new uploads
//       for (let i = 0; i < newImages.length; i++) {
//         const file = newImages[i];
//         const fileExtension = file.name.split(".").pop();
//         const newFileName = `images/${uuidv4()}.${fileExtension}`;

//         // Upload file to S3
//         const { url, key } = await putObject(file.data, newFileName);

//         if (!key || !url) {
//           return res.status(400).json({
//             success: false,
//             message: "Image upload failed",
//           });
//         }

//         // Delete the corresponding old image if it exists
//         if (updatedImages[i]?.key) {
//           try {
//             // console.log("Deleting old image:", updatedImages[i].key);
//             await deleteObject(updatedImages[i].key);
//           } catch (err) {
//             console.error(
//               "Error deleting old image:",
//               // updatedImages[i].key,
//               err
//             );
//           }
//         }

//         // Replace or insert the new image in the array
//         updatedImages[i] = { image: url, key, updatedUserName: updatedByUser };
//       }

//       // If new images are fewer than old images, delete remaining old images
//       if (newImages.length < updatedImages.length) {
//         for (let i = newImages.length; i < updatedImages.length; i++) {
//           if (updatedImages[i]?.key) {
//             try {
//               // console.log("Deleting excess old image:", updatedImages[i].key);
//               await deleteObject(updatedImages[i].key);
//             } catch (err) {
//               console.error(
//                 "Error deleting excess old image:",
//                 // updatedImages[i].key,
//                 err
//               );
//             }
//           }
//         }
//         // Trim the updatedImages array to match newImages length
//         updatedImages = updatedImages.slice(0, newImages.length);
//       }
//     }

//      const sizesArray = setSizesAvailable.split(',').map(size => size.trim());
//      //const finalArray = sizesArray.map(size => size.slice(0, -1));

//     // Update the product with new details and images
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         price,
//         description,
//         category,
//         seller,
//         stock,
//         sizesAvailable: sizesArray,
//         images: updatedImages,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedProduct) {
//       return res.status(400).json({
//         success: false,
//         message: "Failed to update the product",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       product: updatedProduct,
//     });
//   } catch (err) {
//     console.error("Error updating product:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message,
//     });
//   }
// };

//Delete Product - delete /api/v1/product/:id
// exports.deleteProduct = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // Handle image deletion for multiple images (if applicable)
//     if (product.images && product.images.length > 0) {
//       // Delete each image from S3 using the key (assuming `images` is an array of image objects with `key` and `url`)
//       for (const image of product.images) {
//         try {
//           await deleteObject(image.key); // Delete the image using its key from S3
//         } catch (err) {
//           console.error("Error deleting image:", err);
//         }
//       }
//     }

//     // Delete the product from the database
//     await product.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Product and images deleted successfully",
//     });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error, unable to delete product",
//     });
//   }
// };

//Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //Finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //Updating the review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //Creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //Finding average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({productUId: req.query.id}).populate(
    "reviews.user",
    "name email"
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  // Make sure to await the call to retrieve the product
  const product = await Product.findById(req.query.productId);

  // Check if the product exists
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Filtering the reviews which do not match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  // Num of Reviews updating
  const numOfReviews = reviews.length;

  // Finding the average with filtered reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  // Save the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const totalProducts = await Product.countDocuments();

  const products = await Product.find()
    .populate("user", "name email")
    .sort({ updatedAt: -1, createdAt: -1 }) 
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    resPerPage: limit,
    products,
  });
});

exports.updatePriceOfAllProducts = catchAsyncError(async (req, res, next) => {
    const adminPercentModl = await AdminMainModl.findOne().sort({ createdAt: -1 });

    if (!adminPercentModl) {
        return res.status(404).json({ message: "Tax data not found" });
    }

    const platformChargeset = adminPercentModl.platFormCharge;
    const gstChargeset = adminPercentModl.percentGst;
    const actualCharge = adminPercentModl.strategicCharge;
    const outOfChargeset = adminPercentModl.outOfCharge;
   

    // const updatedProducts = await Product.updateMany({}, [
    //   {
    //       $set: {
    //           basePrice: "$basePrice",
    //           price: {
    //             $round: [
    //                 {
    //                     $add: [
    //                         "$basePrice", 
    //                         { $multiply: ["$basePrice", platformChargeset / outOfChargeset] },
    //                         { 
    //                             $multiply: [
    //                                 { 
    //                                     $add: [
    //                                         "$basePrice",
    //                                         { $multiply: ["$basePrice", platformChargeset / outOfChargeset] }
    //                                     ] 
    //                                 },
    //                                 gstChargeset / outOfChargeset
    //                             ]
    //                         }
    //                     ]
    //                 },
    //               ]
    //           },
    //           flatFormCharge: { 
    //             $round: [{ $multiply: ["$basePrice", platformChargeset / outOfChargeset ] }, 0]
    //           },
    //           finalProdPrice: {
    //             $add: [
    //                 "$basePrice",
    //                 { $round: [{ $multiply: ["$basePrice", platformChargeset / outOfChargeset ] }, 0] }
    //             ]
    //           },
    //           taxPrice: {
    //             $round: [
    //               {
    //                 $multiply: [
    //                   { 
    //                       $add: [
    //                           "$basePrice",
    //                           { $multiply: ["$basePrice", platformChargeset / outOfChargeset] } 
    //                       ]
    //                   },
    //                   gstChargeset / outOfChargeset
    //                ]
    //               }
    //             ]
    //           },
    //           totalPrice: {
    //             $round: [
    //                 {
    //                     $add: [
    //                         { $add: [
    //                             "$basePrice",
    //                             { $multiply: ["$basePrice", platformChargeset / outOfChargeset ] }
    //                         ] },
    //                         { 
    //                             $multiply: [
    //                                 { $add: [
    //                                     "$basePrice",
    //                                     { $multiply: ["$basePrice", platformChargeset / outOfChargeset ] }
    //                                 ] },
    //                                 gstChargeset / outOfChargeset 
    //                             ] 
    //                         }
    //                     ]
    //                 },
    //               0 
    //             ]
    //           },
    //           strategicPrice: {
    //             $round: [{ $add: ["$totalPrice", { $multiply: ["$totalPrice", actualCharge / outOfChargeset] }] }, 0]
    //           }
    //       }
    //   }
    // ]);

    const updatedProducts = await Product.updateMany({}, [
      {
          $set: {
              basePrice: "$basePrice",
  
              // Price calculation
              price: {
                  $round: [
                      {
                          $add: [
                              "$basePrice", 
                              { $multiply: ["$basePrice", platformChargeset / outOfChargeset] },
                              { 
                                  $multiply: [
                                      { 
                                          $add: [
                                              "$basePrice",
                                              { $multiply: ["$basePrice", platformChargeset / outOfChargeset] }
                                          ] 
                                      },
                                      gstChargeset / outOfChargeset
                                  ]
                              }
                          ]
                      },
                      0 // Round to nearest integer
                  ]
              },
  
              // Platform charge
              flatFormCharge: { 
                  $round: [{ $multiply: ["$basePrice", platformChargeset / outOfChargeset] }, 0]
              },
  
              // Final product price before tax
              finalProdPrice: {
                  $add: [
                      "$basePrice",
                      { $round: [{ $multiply: ["$basePrice", platformChargeset / outOfChargeset] }, 0] }
                  ]
              }
          }
      },
      {
          $set: {
              // Tax Price Calculation
              taxPrice: {
                  $round: [
                      {
                          $multiply: [
                              "$finalProdPrice",
                              gstChargeset / outOfChargeset
                          ]
                      },
                      0 // Round to nearest integer
                  ]
              }
          }
      },
      {
          $set: {
              // Total price after tax
              totalPrice: {
                  $round: [
                      { $add: ["$finalProdPrice", "$taxPrice"] },
                      0
                  ]
              }
          }
      },
      {
          $set: {
              // Strategic price (after additional charge)
              strategicPrice: {
                  $round: [
                      { $add: ["$totalPrice", { $multiply: ["$totalPrice", actualCharge / outOfChargeset] }] },
                      0
                  ]
              }
          }
      }
    ]);

    res.json({
      message: "Product prices updated successfully",
      modifiedCount: updatedProducts.modifiedCount
  });
});

async function generateUniqueCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let uniqueCode;
  let isUnique = false;

  while (!isUnique) {
    const randomLetters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
    const randomNumbers = Math.floor(1000 + Math.random() * 9000);
    uniqueCode = `${randomLetters}${randomNumbers}`;

    // Check database for existing productId
    const existingProduct = await Product.findOne({ productUId: uniqueCode });
    if (!existingProduct) {
      isUnique = true;
    }
  }
  
  return uniqueCode;
}

// -------------------------------------------------------------
// Development Purpose

exports.getSellerProducts = catchAsyncError(async (req, res, next) => {
  let { page = 1, limit = 10 } = req.query;
  page = Number(page);
  limit = Number(limit);

  const totalProducts = await Product.countDocuments({ user: req.user.id });

  const products = await Product.find({ user: req.user.id })
    .sort({ updatedAt: -1, createdAt: -1 }) 
    .skip((page - 1) * limit)
    .limit(limit);

  const outOfStockCount = await Product.countDocuments({ user: req.user.id, stock: 0 });

  res.status(200).json({
    success: true,
    count: totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    resPerPage: limit,
    outOfStockCount,
    products,
  });
});

exports.newProduct = catchAsyncError(async (req, res, next) => {
  if (!req.user || !req.user.name) {
    return res.status(400).json({ success: false, message: "User information is missing" });
  }

  const uploaderUserName = `created by ${req.user.name}`;

  let images = [];
  let BASE_URL = process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;

  if (Array.isArray(req.files) && req.files.length > 0) {
    req.files.forEach((file) => {
      images.push({ image: `${BASE_URL}/uploads/product/${file.originalname}`, updatedUserName: uploaderUserName });
    });
  }

  req.body.images = images;
  req.body.user = req.user._id;

  const uniqueUCode = await generateUniqueCode();

  const product = await Product.create({
    ...req.body,
    productUId: uniqueUCode,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = async (req, res, next) => {
  
  if (!req.user || !req.user.name) {
    return res.status(400).json({ success: false, message: "User information is missing" });
  }

  const updatorUserName = `updated by ${req.user.name}`;

  let product = await Product.findById(req.params.id);
  

  //Uploading images
  let images = [];

  //If images not cleared we keep existing images
  if (req.body.imagesCleared === "false") {
    images = product.images;
  }
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url,  updatedUserName: updatorUserName });
    });
  }
  req.body.images = images;

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
};

// ---- Backup routes ----

// exports.newProduct = catchAsyncError(async (req, res, next) => {
//   let images = [];

//   let BASE_URL = process.env.BACKEND_URL;
//   if (process.env.NODE_ENV === "production") {
//     BASE_URL = `${req.protocol}://${req.get("host")}`;
//   }

//   if (req.files.length > 0) {
//     req.files.forEach((file) => {
//       let url = `${BASE_URL}/uploads/product/${file.originalname}`;
//       images.push({ image: url });
//     });
//   }
//   req.body.images = images;
//   req.body.user = req.user.id;

  

//   const product = await Product.create(
//     req.body,
//   );

//   res.status(201).json({
//     success: true,
//     product,
//   });
// });
// 
// -----------------------------------------

// exports.getProducts = async (req, res, next) => {
//   const resPerPage = 8;
//   let { keyword } = req.query;

//   let searchRegex = new RegExp(".*", "i"); // Default: match everything

//   // Apply typo correction and synonym expansion if a keyword exists
//   if (keyword) {
//     searchRegex = enhanceSearchQuery(keyword);
//   }

//   console.log("Final Search Regex:", searchRegex); // Debugging

//   let products = await Product.aggregate([
//     {
//       $match: { stock: { $gt: 0 }, description: searchRegex }, // Filter products
//     },
//     {
//       $addFields: {
//         matchScore: {
//           $size: {
//             $setIntersection: [
//               { $split: ["$description", " "] }, // Split description into words
//               keyword.split(" "), // Split user query into words
//             ],
//           },
//         },
//       },
//     },
//     { $sort: { matchScore: -1 } }, // Prioritize products with more keyword matches
//     { $skip: resPerPage * ((req.query.page || 1) - 1) }, // Pagination
//     { $limit: resPerPage },
//   ]);

//   const totalProductsCount = await Product.countDocuments({ stock: { $gt: 0 } });

//   res.status(200).json({
//     success: true,
//     count: products.length,
//     resPerPage,
//     products,
//   });
// };

// -------------------------------------

// exports.getProducts = async (req, res, next) => {
//   const resPerPage = 8;
//   let { keyword } = req.query;

//   let searchRegex = new RegExp(".*", "i"); // Default: match everything

//   // Apply typo correction and synonym expansion if a keyword exists
//   if (keyword) {
//     searchRegex = enhanceSearchQuery(keyword);
//   }

//   console.log("Final Search Regex:", searchRegex); // Debugging the query

//   let buildQuery = () => {
//     return new APIFeatures(
//       Product.find({ stock: { $gt: 0 }, description: searchRegex }),
//       req.query
//     ).filter();
//   };

//   const filteredProductsCount = await buildQuery().query.countDocuments({});
//   const totalProductsCount = await Product.countDocuments({ stock: { $gt: 0 } });
//   let productsCount = totalProductsCount;

//   if (filteredProductsCount !== totalProductsCount) {
//     productsCount = filteredProductsCount;
//   }

//   const products = await buildQuery().paginate(resPerPage).query;

//   res.status(200).json({
//     success: true,
//     count: productsCount,
//     resPerPage,
//     products,
//   });
// };

// ------------------------------

// exports.getProducts = async (req, res, next) => {
//   const resPerPage = 8;

//   let buildQuery = () => {
//     return new APIFeatures(Product.find({ stock: { $gt: 0 } }), req.query)
//       .search()
//       .filter();
//   };

//   const filteredProductsCount = await buildQuery().query.countDocuments({});
//   const totalProductsCount = await Product.countDocuments({ stock: { $gt: 0 } });
//   let productsCount = totalProductsCount;

//   if (filteredProductsCount !== totalProductsCount) {
//     productsCount = filteredProductsCount;
//   }

//   const products = await buildQuery().paginate(resPerPage).query;

//   res.status(200).json({
//     success: true,
//     count: productsCount,
//     resPerPage,
//     products,
//   });
// };

// -----------------------

// exports.getProducts = async (req, res, next) => {
//   const resPerPage = 10;

//   let buildQuery = () => {
//     return new APIFeatures(Product.find(), req.query).search().filter();
//   };

//   const filteredProductsCount = await buildQuery().query.countDocuments({});
//   const totalProductsCount = await Product.countDocuments({});
//   let productsCount = totalProductsCount;

//   if (filteredProductsCount !== totalProductsCount) {
//     productsCount = filteredProductsCount;
//   }

//   const products = await buildQuery().paginate(resPerPage).query;
//   // await new Promise((resolve) => setTimeout(resolve, 3000));

//   res.status(200).json({
//     success: true,
//     count: productsCount,
//     resPerPage,
//     products,
//   });
// };

// --------------------------

//get admin products - api/v1/admin/products
// exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
//   const products = await Product.find().sort({
//     createdAt: -1,
//   });
//   res.status(200).send({
//     success: true,
//     products,
//   });
// });

// -----------------------

// exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
//   const products = await Product.find()
//     .populate('user', 'name email')
//     .sort({ createdAt: -1 });

//   res.status(200).send({
//     success: true,
//     products,
//   });
// });

// -------------------------

// exports.getSellerProducts = catchAsyncError(async (req, res, next) => {
//   const products = await Product.find({ user: req.user.id }).sort({
//     createdAt: -1,
//   });
//   res.status(200).send({
//     success: true,
//     products,
//   });
// });