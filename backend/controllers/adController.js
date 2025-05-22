const { v4: uuid4 } = require("uuid");
const Ad = require("../models/adModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const APIFeatures = require("../utils/apiFeatures.js");
const { putObject } = require("../utils/putObject.js");
const { deleteObject } = require("../utils/deleteObject.js");

exports.getAds = catchAsyncError(async (req, res, next) => {
  try {
    // Await the result of Ad.find()
    const ads = await Ad.find();

    res.status(200).json({
      status: "success",
      data: ads,
    });
  } catch (err) {
    console.error("Error fetching ads:", err);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

exports.getSingleAd = catchAsyncError(async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return next(new ErrorHandler("Ad not found", 404));
    }

    res.status(200).json({
      success: true,
      ad,
    });
  } catch (err) {
    console.error("Error in getting single ad :", err);
  }
});

exports.newAd = catchAsyncError(async (req, res, next) => {
  try {
    const {
      title,
      description,
      secTitle,
      secDescription,
      formalTitle,
      casualTitle,
      shoesTitle,
      hoodiesTitle,
      cappsTitle,
      shirtsTitle,
      myUser,
      formalCategory,
      casualCategory,
      shoesCategory,
      hoodiesCategory,
      cappsCategory,
      shirtsCategory
    } = req.body;

    const {
      mainImages,
      secImages,
      formalimage,
      casualimage,
      shoesImage,
      hoodiesImage,
      cappsImage,
      shirtsImage,
    } = req.files;

    const updatedByUser = `Created-${myUser}`;

    // Validate required fields
    if (
      !title ||
      !description ||
      !secTitle ||
      !secDescription ||
      !formalTitle ||
      !casualTitle ||
      !shoesTitle ||
      !hoodiesTitle ||
      !cappsTitle ||
      !shirtsTitle ||
      !mainImages ||
      !secImages ||
      !formalimage ||
      !casualimage ||
      !shoesImage ||
      !hoodiesImage ||
      !cappsImage ||
      !shirtsImage ||
      !formalCategory ||
      !casualCategory ||
      !shoesCategory ||
      !hoodiesCategory ||
      !cappsCategory ||
      !shirtsCategory
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    // Validate field lengths
    const validations = [
      {
        field: title,
        limit: 20,
        message: "Title should not exceed 20 characters",
      },
      {
        field: description,
        limit: 40,
        message: "Description should not exceed 40 characters",
      },
      {
        field: secTitle,
        limit: 20,
        message: "Second title should not exceed 20 characters",
      },
      {
        field: secDescription,
        limit: 30,
        message: "Second description should not exceed 30 characters",
      },
      {
        field: formalTitle,
        limit: 10,
        message: "Formal title should not exceed 10 characters",
      },
      {
        field: casualTitle,
        limit: 10,
        message: "Casual title should not exceed 10 characters",
      },
      {
        field: shoesTitle,
        limit: 10,
        message: "Shoes title should not exceed 10 characters",
      },
      {
        field: hoodiesTitle,
        limit: 10,
        message: "Hoodies title should not exceed 10 characters",
      },
      {
        field: cappsTitle,
        limit: 10,
        message: "Caps title should not exceed 10 characters",
      },
      {
        field: shirtsTitle,
        limit: 10,
        message: "Shirts title should not exceed 10 characters",
      },
    ];

    for (const { field, limit, message } of validations) {
      if (field.length > limit) {
        return res.status(400).json({ status: "error", message });
      }
    }

    // Helper function to upload images
    const uploadImages = async (filesArray) => {
      try {
        const imageObjects = [];
        for (const file of Array.isArray(filesArray)
          ? filesArray
          : [filesArray]) {
          const uniqueFileName = `ads/${uuid4()}`;
          const { url, key } = await putObject(file.data, uniqueFileName);

          if (!url || !key) {
            throw new Error(`Image upload failed for file: ${file.name}`);
          }

          imageObjects.push({
            image: url,
            key,
            updatedUserName: updatedByUser,
          });
        }
        return imageObjects;
      } catch (error) {
        console.error("Error uploading images:", error.message);
        throw new Error("Image upload failed. Please try again.");
      }
    };

    // Upload images
    const firstImageObject = await uploadImages(mainImages);
    const secondImageObject = await uploadImages(secImages);
    const formalImageHere = (await uploadImages(formalimage))[0];
    const casualImageHere = (await uploadImages(casualimage))[0];
    const shoesImageHere = (await uploadImages(shoesImage))[0];
    const hoodiesImageHere = (await uploadImages(hoodiesImage))[0];
    const capsImageHere = (await uploadImages(cappsImage))[0];
    const shirtImageHere = (await uploadImages(shirtsImage))[0];

    // Create Ad document
    const ads = await Ad.create({
      mainAd: {
        mainImages: firstImageObject,
        title,
        description,
      },
      secMainAd: {
        secImages: secondImageObject,
        secTitle,
        secDescription,
      },
      trendProducts: {
        formals: {
          formalImage: formalImageHere,
          formalTitle,
          formalCategory
        },
        casuals: {
          casualImage: casualImageHere,
          casualTitle,
          casualCategory
        },
        shoes: {
          shoesImage: shoesImageHere,
          shoesTitle,
          shoesCategory
        },
        hoodies: {
          hoodiesImage: hoodiesImageHere,
          hoodiesTitle,
          hoodiesCategory
        },
        capps: {
          cappsImage: capsImageHere,
          cappsTitle,
          cappsCategory
        },
        shirts: {
          shirtsImage: shirtImageHere,
          shirtsTitle,
          shirtsCategory
        },
      },
    });

    res.status(201).json({
      status: "success",
      data: ads,
    });
  } catch (err) {
    console.error("Ad creation failed:", err);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
});

exports.updateAd = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    secTitle,
    secDescription,
    formalTitle,
    casualTitle,
    shoesTitle,
    hoodiesTitle,
    cappsTitle,
    shirtsTitle,
    myUser,
    formalCategory,
    casualCategory,
    shoesCategory,
    hoodiesCategory,
    cappsCategory,
    shirtsCategory
  } = req.body;

  const validationRules = [
    {
      field: title,
      limit: 20,
      message: "Main ad title should not exceed 20 characters",
    },
    {
      field: description,
      limit: 40,
      message: "Main ad description should not exceed 40 characters",
    },
    {
      field: secTitle,
      limit: 20,
      message: "Second ad title should not exceed 20 characters",
    },
    {
      field: secDescription,
      limit: 30,
      message: "Second ad description should not exceed 30 characters",
    },
    {
      field: formalTitle,
      limit: 10,
      message: "Formal title should not exceed 10 characters",
    },
    {
      field: casualTitle,
      limit: 10,
      message: "Casual title should not exceed 10 characters",
    },
    {
      field: shoesTitle,
      limit: 10,
      message: "Shoes title should not exceed 10 characters",
    },
    {
      field: hoodiesTitle,
      limit: 10,
      message: "Hoodies title should not exceed 10 characters",
    },
    {
      field: cappsTitle,
      limit: 10,
      message: "Caps title should not exceed 10 characters",
    },
    {
      field: shirtsTitle,
      limit: 10,
      message: "Shirts title should not exceed 10 characters",
    },
  ];

  for (const { field, limit, message } of validationRules) {
    if (field && field.length > limit) {
      return res.status(400).json({ status: "error", message });
    }
  }

  const images = req.files || {};
  const updatedUserName = `Updated-${myUser}`;

  const ad = await Ad.findById(id);
  if (!ad) {
    return res.status(404).json({ success: false, message: "Ad not found" });
  }

  const updateImages = async (existingImages, newImages) => {
    let updatedImages = [...existingImages];

    if (newImages) {
      const imageArray = Array.isArray(newImages) ? newImages : [newImages];

      for (let i = 0; i < imageArray.length; i++) {
        const file = imageArray[i];
        const fileExtension = file.name.split(".").pop();
        const newFileName = `ads/${uuid4()}.${fileExtension}`;

        const { url, key } = await putObject(file.data, newFileName);

        if (!url || !key) {
          return res
            .status(400)
            .json({ success: false, message: "Image upload failed" });
        }

        if (updatedImages[i]?.key) {
          try {
            await deleteObject(updatedImages[i].key);
          } catch (err) {
            console.error("Error deleting old image:", err);
          }
        }

        updatedImages[i] = { image: url, key, updatedUserName };
      }

      if (imageArray.length < updatedImages.length) {
        for (let i = imageArray.length; i < updatedImages.length; i++) {
          if (updatedImages[i]?.key) {
            try {
              await deleteObject(updatedImages[i].key);
            } catch (err) {
              console.error("Error deleting excess image:", err);
            }
          }
        }
        updatedImages = updatedImages.slice(0, imageArray.length);
      }
    }

    return updatedImages;
  };

  ad.mainAd.mainImages = await updateImages(
    ad.mainAd.mainImages,
    images.mainImages
  );
  ad.secMainAd.secImages = await updateImages(
    ad.secMainAd.secImages,
    images.secImages
  );

  ad.mainAd.title = title || ad.mainAd.title;
  ad.mainAd.description = description || ad.mainAd.description;
  ad.secMainAd.secTitle = secTitle || ad.secMainAd.secTitle;
  ad.secMainAd.secDescription = secDescription || ad.secMainAd.secDescription;
  
  ad.trendProducts.formals.formalTitle =
    formalTitle || ad.trendProducts.formals.formalTitle;
  ad.trendProducts.formals.formalCategory =
    formalCategory || ad.trendProducts.formals.formalCategory;

  ad.trendProducts.casuals.casualTitle =
    casualTitle || ad.trendProducts.casuals.casualTitle;
  ad.trendProducts.casuals.casualCategory =
    casualCategory || ad.trendProducts.casuals.casualCategory;

  ad.trendProducts.shoes.shoesTitle =
    shoesTitle || ad.trendProducts.shoes.shoesTitle;
  ad.trendProducts.shoes.shoesCategory =
    shoesCategory || ad.trendProducts.shoes.shoesCategory;

  ad.trendProducts.hoodies.hoodiesTitle =
    hoodiesTitle || ad.trendProducts.hoodies.hoodiesTitle;
  ad.trendProducts.hoodies.hoodiesCategory =
    hoodiesCategory || ad.trendProducts.hoodies.hoodiesCategory;
  
  ad.trendProducts.capps.cappsTitle =
    cappsTitle || ad.trendProducts.capps.cappsTitle;
  ad.trendProducts.capps.cappsCategory =
    cappsCategory || ad.trendProducts.capps.cappsCategory;

  ad.trendProducts.shirts.shirtsTitle =
    shirtsTitle || ad.trendProducts.shirts.shirtsTitle;
  ad.trendProducts.shirts.shirtsCategory =
    shirtsCategory || ad.trendProducts.shirts.shirtsCategory;

  ad.trendProducts.formals.formalImage =
    (images.formalimage &&
      (
        await updateImages(
          [ad.trendProducts.formals.formalImage],
          images.formalimage
        )
      )[0]) ||
    ad.trendProducts.formals.formalImage;
  ad.trendProducts.casuals.casualImage =
    (images.casualimage &&
      (
        await updateImages(
          [ad.trendProducts.casuals.casualImage],
          images.casualimage
        )
      )[0]) ||
    ad.trendProducts.casuals.casualImage;
  ad.trendProducts.shoes.shoesImage =
    (images.shoesImage &&
      (
        await updateImages(
          [ad.trendProducts.shoes.shoesImage],
          images.shoesImage
        )
      )[0]) ||
    ad.trendProducts.shoes.shoesImage;
  ad.trendProducts.hoodies.hoodiesImage =
    (images.hoodiesImage &&
      (
        await updateImages(
          [ad.trendProducts.hoodies.hoodiesImage],
          images.hoodiesImage
        )
      )[0]) ||
    ad.trendProducts.hoodies.hoodiesImage;
  ad.trendProducts.capps.cappsImage =
    (images.cappsImage &&
      (
        await updateImages(
          [ad.trendProducts.capps.cappsImage],
          images.cappsImage
        )
      )[0]) ||
    ad.trendProducts.capps.cappsImage;
  ad.trendProducts.shirts.shirtsImage =
    (images.shirtsImage &&
      (
        await updateImages(
          [ad.trendProducts.shirts.shirtsImage],
          images.shirtsImage
        )
      )[0]) ||
    ad.trendProducts.shirts.shirtsImage;

  await ad.save();

  res.status(200).json({ success: true, ad });
});

exports.deleteAd = catchAsyncError(async (req, res, next) => {
  try {
    // Find the ad by ID
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    // Delete main ad images from S3
    if (ad.mainAd.mainImages && ad.mainAd.mainImages.length > 0) {
      for (const image of ad.mainAd.mainImages) {
        try {
          await deleteObject(image.key); // Delete the image from S3
        } catch (err) {
          console.error("Error deleting main ad image:", err);
        }
      }
    }

    // Delete secondary main ad images from S3
    if (ad.secMainAd.secImages && ad.secMainAd.secImages.length > 0) {
      for (const image of ad.secMainAd.secImages) {
        try {
          await deleteObject(image.key); // Delete the image from S3
        } catch (err) {
          console.error("Error deleting secondary ad image:", err);
        }
      }
    }

    // Delete trend products images from S3
    const trendProducts = [
      "formals",
      "casuals",
      "shoes",
      "hoodies",
      "capps",
      "shirts",
    ];
    trendProducts.forEach(async (product) => {
      const productData = ad.trendProducts[product];
      if (productData) {
        if (productData.formalImage) {
          try {
            await deleteObject(productData.formalImage.key); // Delete the formal image from S3
          } catch (err) {
            console.error(`Error deleting ${product} formal image:`, err);
          }
        }
        if (productData.casualImage) {
          try {
            await deleteObject(productData.casualImage.key); // Delete the casual image from S3
          } catch (err) {
            console.error(`Error deleting ${product} casual image:`, err);
          }
        }
        if (productData.shoesImage) {
          try {
            await deleteObject(productData.shoesImage.key); // Delete the shoes image from S3
          } catch (err) {
            console.error(`Error deleting ${product} shoes image:`, err);
          }
        }
        if (productData.hoodiesImage) {
          try {
            await deleteObject(productData.hoodiesImage.key); // Delete the hoodies image from S3
          } catch (err) {
            console.error(`Error deleting ${product} hoodies image:`, err);
          }
        }
        if (productData.cappsImage) {
          try {
            await deleteObject(productData.cappsImage.key); // Delete the capps image from S3
          } catch (err) {
            console.error(`Error deleting ${product} capps image:`, err);
          }
        }
        if (productData.shirtsImage) {
          try {
            await deleteObject(productData.shirtsImage.key); // Delete the shirts image from S3
          } catch (err) {
            console.error(`Error deleting ${product} shirts image:`, err);
          }
        }
      }
    });

    // Delete the ad from the database
    await ad.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ad and all associated images deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting ad:", err);
    res.status(500).json({
      success: false,
      message: "Server error, unable to delete ad",
    });
  }
});
