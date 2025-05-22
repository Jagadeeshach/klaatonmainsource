const AdminMain = require("../models/adminMain");
const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.newAdminMain = catchAsyncError(async (req, res, next) => {
    let {
        platFormCharge, 
        percentGst, 
        strategicCharge, 
        outOfCharge, 
        discountCharge, 
        couponCodes,
        discountTimes,
        refererAmount,
        productCategories,
        productTopCategories,
        madeByUser,
    } = req.body;

    // Convert numeric string values to numbers
    [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge] = 
        [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge].map(value =>
            !isNaN(value) ? Number(value) : value
        );

    // Check for missing values
    if (![platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge, couponCodes].every(val => val !== undefined)) {
        return next(new ErrorHandler("Something is missing!", 404));
    }

    // Validate range
    const invalidValue = [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge]
        .some(value => value < 0 || value > 100);
    
    if (invalidValue) {
        return next(new ErrorHandler("Value should be in range 0 to 100!", 404));
    }

    const adminMain = await AdminMain.create({
        platFormCharge, 
        percentGst, 
        strategicCharge, 
        outOfCharge, 
        discountCharge, 
        couponCodes,
        discountTimes,
        refererAmount,
        productCategories,
        productTopCategories,
        madeByUser,
    });

    res.status(201).json({
        success: true,
        adminMain,
    });
});

exports.getAllAdminMains = catchAsyncError(async (req, res, next)=>{
    const adminMains = await AdminMain.find();

    if (adminMains.length === 0) {
        return next(new ErrorHandler("Admin data is empty or 0", 404));
    }
    const adminDetailsCounts = adminMains.length;

    res.status(200).send({
        success: true,
        totalCount: adminDetailsCounts,
        adminMains,
    });
});

exports.getAllVendorAdmin = catchAsyncError(async (req, res, next) => {
    const adminMains = await AdminMain.find().select("-couponCodes -discountCharge -discountTimes -productTopCategories -madeByUser");

    if (adminMains.length === 0) {
        return next(new ErrorHandler("Admin data is empty or 0", 404));
    }

    res.status(200).send({
        success: true,
        totalCount: adminMains.length,
        adminMains,
    });
});

exports.getAllAdminpolicy = catchAsyncError(async (req, res, next) => {
    const adminMains = await AdminMain.find();

    if (adminMains.length === 0) {
        return next(new ErrorHandler("Admin data is empty or 0", 404));
    }

    res.status(200).send({
        success: true,
        totalCount: adminMains.length,
        adminMains,
    });
});

exports.getAdminCategories = catchAsyncError(async (req, res, next) => {
    const adminMains = await AdminMain.find();

    if (adminMains.length === 0) {
        return next(new ErrorHandler("Admin data is empty or 0", 404));
    }

    // Extract only productCategories and productTopCategories from each adminMain document
    const filteredData = adminMains.map(({ productCategories, productTopCategories }) => ({
        productCategories,
        productTopCategories,
    }));

    res.status(200).send({
        success: true,
        totalCount: adminMains.length,
        adminMains: filteredData, // Only includes the required fields
    });
});

exports.getSingleAdminMain = catchAsyncError(async (req, res, next) => {
    const adminMain = await AdminMain.findById(req.params.id);

    if (!adminMain) {
        return next(new ErrorHandler("Admin details not found", 404));
    };

    res.status(200).send({
        success: true,
        adminMain,
    });
});

exports.updateAdminMain = catchAsyncError(async (req, res, next) => {
    let adminMain = await AdminMain.findById(req.params.id);

    if (!adminMain) {
        return next(new ErrorHandler("Admin details not found for updating", 404));
    }

    let {
        platFormCharge, 
        percentGst, 
        strategicCharge, 
        outOfCharge, 
        discountCharge, 
        couponCodes,
        discountTimes,
        refererAmount,
        productCategories,
        productTopCategories,
        madeByUser,
    } = req.body;

    // Convert numeric string values to numbers
    [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge] = 
        [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge].map(value =>
            !isNaN(value) ? Number(value) : value
        );

    // Check for missing values
    if (![platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge, couponCodes].every(val => val !== undefined)) {
        return next(new ErrorHandler("Something is missing!", 404));
    }

    // Validate range
    const invalidValue = [platFormCharge, percentGst, strategicCharge, outOfCharge, discountCharge]
        .some(value => value < 0 || value > 100);
    
    if (invalidValue) {
        return next(new ErrorHandler("Value should be in range 0 to 100!", 404));
    }

    adminMain = await AdminMain.findByIdAndUpdate(
        req.params.id, 
        {
            platFormCharge, 
            percentGst, 
            strategicCharge, 
            outOfCharge, 
            discountCharge, 
            couponCodes,
            discountTimes,
            refererAmount,
            productCategories,
            productTopCategories,
            madeByUser
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        success: true,
        adminMain,
    });
});

exports.deleteAdminMain = catchAsyncError(async (req, res, next) => {
    const adminMain = await AdminMain.findById(req.params.id);

    if (!adminMain) {
        return next(new ErrorHandler("Admin details not found for deleting", 404));
    };

    await adminMain.deleteOne();

    res.status(200).json({
        success: true,
        message: "Admin details successfully deleted !"
    })
});

exports.createReferer = catchAsyncError(async (req, res, next) => {
    const { userEmail, userCouponCode } = req.body;

    
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.userCouponCode = userCouponCode;

    await user.save();

    const updatedUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        userCouponCode: user.userCouponCode
    };

    res.status(200).json({
        success: true,
        updatedUser
    });
});

exports.updateReferer = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const { userCouponCode } = req.body;

    const updateUser = await UserModel.findByIdAndUpdate(
        req.params.id, 
        { userCouponCode }, 
        { new: true, runValidators: true } 
    );

    if (!updateUser) {
        return next(new ErrorHandler("Failed to update user", 500));
    }

    const updatedUser = {
        id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        role: updateUser.role,
        userCouponCode: updateUser.userCouponCode
    };

    res.status(200).json({
        success: true,
        updatedUser
    });
});

exports.getAllReferers = catchAsyncError(async (req, res, next) => {
    
    const users = await UserModel.find();

    if (!users || users.length === 0) {
        return next(new ErrorHandler("No users found", 404));
    }

    
    const filteredUsers = users
        .filter(user => user.role === "deliveryboy")
        .map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            userCouponCode: user.userCouponCode,
            refererEarned: user.refererEarned,
        }));

    res.status(200).json({
        success: true,
        filteredUsers
    });
});

exports.getSingleReferer = catchAsyncError(async (req, res, next) => {
    
    const user = await UserModel.findById(req.params.id);

    
    if (!user) {
        return next(new ErrorHandler("No user found", 404));
    }

    
    res.status(200).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            userCouponCode: user.userCouponCode,
            refererEarned: user.refererEarned,
        }
    });
});

// ----Backup controllers ---

// exports.newAdminMain = catchAsyncError(async (req, res, next) => {
//     const {
//         platFormCharge, 
//         percentGst, 
//         strategicCharge, 
//         outOfCharge, 
//         discountCharge, 
//         couponCodes,
//         madeByUser,
//     } = req.body;

//     if(!platFormCharge ||!percentGst ||!strategicCharge ||!outOfCharge ||!discountCharge ||!couponCodes){
//         return next(new ErrorHandler("Something is missing !", 404));
//     };

//     if (
//         platFormCharge < 0 || platFormCharge > 100 || 
//         percentGst < 0 || percentGst > 100 ||
//         strategicCharge < 0 || strategicCharge > 100 ||
//         outOfCharge < 0 || outOfCharge > 100 ||
//         discountCharge < 0 || discountCharge > 100
//     ) {
//         return next(new ErrorHandler("Value should be in 0 to 100!", 404));
//     };

//     const adminMain = await AdminMain.create({
//         platFormCharge, 
//         percentGst, 
//         strategicCharge, 
//         outOfCharge, 
//         discountCharge, 
//         couponCodes,
//         madeByUser,
//     });

//     res.status(201).json({
//         success: true,
//         adminMain,
//     })
// });

// exports.updateAdminMain = catchAsyncError(async (req, res, next) => {
//     let adminMain = await AdminMain.findById(req.params.id);

//     if (!adminMain) {
//         return next(new ErrorHandler("Admin details not found for updating", 404));
//     };

//     const {
//         platFormCharge, 
//         percentGst, 
//         strategicCharge, 
//         outOfCharge, 
//         discountCharge, 
//         couponCodes,
//         madeByUser,
//     } = req.body;

//     if(!platFormCharge ||!percentGst ||!strategicCharge ||!outOfCharge ||!discountCharge ||!couponCodes){
//         return next(new ErrorHandler("Something is missing !", 404));
//     };

//     if (
//         platFormCharge < 0 || platFormCharge > 100 || 
//         percentGst < 0 || percentGst > 100 ||
//         strategicCharge < 0 || strategicCharge > 100 ||
//         outOfCharge < 0 || outOfCharge > 100 ||
//         discountCharge < 0 || discountCharge > 100
//     ) {
//         return next(new ErrorHandler("Value should be in 0 to 100!", 404));
//     };

//     adminMain = await AdminMain.findByIdAndUpdate(
//         req.params.id, 
//         {
//             platFormCharge, 
//             percentGst, 
//             strategicCharge, 
//             outOfCharge, 
//             discountCharge, 
//             couponCodes,
//             madeByUser
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     res.status(201).json({
//         success: true,
//         adminMain,
//     })
// });