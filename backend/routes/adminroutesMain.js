const express = require("express");
const router = express.Router();

const {
    newAdminMain, 
    getAllAdminMains,
    getSingleAdminMain,
    updateAdminMain,
    deleteAdminMain,
    getAdminCategories,
    getAllVendorAdmin,
    getAllAdminpolicy,
    createReferer,
    updateReferer,
    getAllReferers,
    getSingleReferer,
} = require("../controllers/adminMainController.js");

const {
    isAuthenticatedUser, 
    authorizeRoles
} = require("../middlewares/authenticate");

router.route("/admin/ratecontrol/productcat").get(getAdminCategories);
router.route("/admin/ratecontrol/vendor/policy").get(isAuthenticatedUser, authorizeRoles("seller"), getAllVendorAdmin);
router.route("/admin/ratecontrol/admin/policy/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllAdminpolicy);
router.route("/admin/ratecontrol/new").post(isAuthenticatedUser, authorizeRoles("admin"), newAdminMain);
router.route("/admin/ratecontrol/all").get(isAuthenticatedUser, authorizeRoles("admin"), getAllAdminMains);
router.route("/admin/ratecontrol/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleAdminMain);
router.route("/admin/ratecontrol/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateAdminMain);
router.route("/admin/ratecontrol/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAdminMain);

router.route("/admin/ratecontrol/referer/create").post(isAuthenticatedUser, authorizeRoles("admin"), createReferer);
router.route("/admin/ratecontrol/referer/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateReferer);
router.route("/admin/ratecontrol/all/referers").get(isAuthenticatedUser, authorizeRoles("admin"), getAllReferers);
router.route("/admin/ratecontrol/referer/one/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleReferer);


module.exports = router;