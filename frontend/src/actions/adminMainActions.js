import axios from "axios";
import {
    adminMainRequest,
    adminMainSuccess,
    adminMainFail,
    adminMainSingleRequest,
    adminMainSingleSuccess,
    adminMainSingleFail,
    adminMainCreateRequest,
    adminMainCreateSuccess,
    adminMainCreateFail,
    adminMainUpdateRequest,
    adminMainUpdateSuccess,
    adminMainUpdateFail,
    adminMainDeleteRequest,
    adminMainDeleteSuccess,
    adminMainDeleteFail,
    updatePriceOfAllProRequest,
    updatePriceOfAllProSuccess,
    updatePriceOfAllProFail,
    userProdCatRequest,
    userProdCatSuccess,
    userProdCatFail,
    vendorAdminDetailsRequest,
    vendorAdminDetailsSuccess,
    vendorAdminDetailsFail,
    policyAdminDetailsRequest,
    policyAdminDetailsSuccess,
    policyAdminDetailsFail,
} from "../slices/adminMainSlice";

export const getAllAdminMains = async (dispatch) => {
    try {
        dispatch(adminMainRequest());
        const { data } = await axios.get("/api/v1/admin/ratecontrol/all");
        dispatch(adminMainSuccess(data));
    } catch(error){
        dispatch(adminMainFail(error.response.data.message));
    }
};

export const getAllVendorPolicy = async (dispatch) => {
    try {
        dispatch(vendorAdminDetailsRequest());
        const { data } = await axios.get("/api/v1/admin/ratecontrol/vendor/policy");
        dispatch(vendorAdminDetailsSuccess(data.adminMains));
    } catch(error){
        dispatch(vendorAdminDetailsFail(error.response.data.message));
    }
};

export const getAllAdminPolicyForProd = async (dispatch) => {
    try {
        dispatch(policyAdminDetailsRequest());
        const { data } = await axios.get("/api/v1/admin/ratecontrol/admin/policy/all");
        dispatch(policyAdminDetailsSuccess(data.adminMains));
    } catch(error){
        dispatch(policyAdminDetailsFail(error.response.data.message));
    }
};

export const getUserProductDetailFilter = async (dispatch) => {
    try {
        dispatch(userProdCatRequest());
        const { data } = await axios.get("/api/v1/admin/ratecontrol/productcat");
        dispatch(userProdCatSuccess(data.adminMains));
    } catch(error){
        dispatch(userProdCatFail(error.response.data.message));
    }
};

export const getSingleAdminMain = (id) => async (dispatch) => {
    try {
        dispatch(adminMainSingleRequest());
        const { data } = await axios.get(`/api/v1/admin/ratecontrol/${id}`);
        dispatch(adminMainSingleSuccess(data));
    } catch(error){
        dispatch(adminMainSingleFail(error.response.data.message));
    }
};

export const createNewAdminMain = (formData) => async (dispatch) => {
    try {
        dispatch(adminMainCreateRequest());
        const { data } = await axios.post(`/api/v1/admin/ratecontrol/new`, formData);
        dispatch(adminMainCreateSuccess(data));
    } catch(error){
        dispatch(adminMainCreateFail(error.response.data.message))
    }
};

export const updateAdminMain = (id, formData) => async (dispatch) => {
    try {
        dispatch(adminMainUpdateRequest());
        const { data } = await axios.put(`/api/v1/admin/ratecontrol/${id}`, formData);
        dispatch(adminMainUpdateSuccess(data));
    } catch(error) {
        dispatch(adminMainUpdateFail(error.response.data.message))
    }
};

export const deleteAdminMain = (id) => async (dispatch) => {
    try {
        dispatch(adminMainDeleteRequest());
        await axios.delete(`/api/v1/admin/ratecontrol/${id}`);
        dispatch(adminMainDeleteSuccess());
    } catch (error) {
        dispatch(adminMainDeleteFail(error.response.data.message));
    }
};

export const updatePriceOfAllProduts = async (dispatch) => {
    try {
        dispatch(updatePriceOfAllProRequest());
        const { data } = await axios.put(`/api/v1/admin/update/price/product/all`);
        dispatch(updatePriceOfAllProSuccess(data))
    } catch (error) {
        dispatch(updatePriceOfAllProFail(error.response.data.message))
    }
};