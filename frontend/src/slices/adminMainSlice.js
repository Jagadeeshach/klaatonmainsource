import { createSlice } from "@reduxjs/toolkit";

const adminMainSlice = createSlice({
    name: "adminMain",
    initialState: {
        loading: false,
        adminMains: [],
        vendorAdminDetails: [],
        policyAdminDetails: [],
        userProdCat: [],
        updatedProPrice: null,
        adminMainSingle: null,
        adminMainCreated: null,
        adminMainUpdated: null,
        adminMainDeleted: null,
        error: null,
    },
    reducers: {
        adminMainRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminMainSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminMains: action.payload.adminMains,
            }
        },
        adminMainFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        adminMainSingleRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminMainSingleSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminMainSingle: action.payload.adminMain,
            }
        },
        adminMainSingleFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        adminMainCreateRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminMainCreateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminMainCreated: action.payload.adminMain,
            }
        },
        adminMainCreateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearAdminMainCreated(state, action) {
            return {
                ...state,
                adminMainCreated: null,
            }
        },
        adminMainUpdateRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminMainUpdateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminMainUpdated: action.payload.adminMain,
            }
        },
        adminMainUpdateFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearAdminMainUpdated(state, action) {
            return {
                ...state,
                adminMainUpdated: null,
            }
        },
        adminMainDeleteRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminMainDeleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminMainDeleted: true,
            }
        },
        adminMainDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearAdminMainDeleted(state, action) {
            return {
                ...state,
                adminMainDeleted: null,
            }
        },
        clearAdminMainDetailsError (state, action) {
            return {
                ...state,
                error: null,
            }
        },
        clearAdminMainArray(state, action) {
            return {
                ...state,
                adminMains: [],
            }
        },
        updatePriceOfAllProRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        updatePriceOfAllProSuccess(state, action){
            return {
                ...state,
                loading: false,
                updatedProPrice: action.payload.modifiedCount,
            }
        },
        updatePriceOfAllProFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearPriceUpdatesAllPro(state, action) {
            return {
                ...state,
                updatedProPrice: null,
            }
        },
        userProdCatRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userProdCatSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userProdCat: action.payload,
            }
        },
        userProdCatFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearLogoutAllAdminData(state, action) {
            return {
                ...state,
                adminMains: [],
                vendorAdminDetails: [],
                policyAdminDetails: [],
                adminMainSingle: null,
            }
        },
        vendorAdminDetailsRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        vendorAdminDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                vendorAdminDetails: action.payload,
            }
        },
        vendorAdminDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        policyAdminDetailsRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        policyAdminDetailsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                policyAdminDetails: action.payload,
            }
        },
        policyAdminDetailsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
    },
});

const { actions, reducer } = adminMainSlice;

export const {
    adminMainRequest,
    adminMainSuccess,
    adminMainFail,
    adminMainSingleRequest,
    adminMainSingleSuccess,
    adminMainSingleFail,
    adminMainCreateRequest,
    adminMainCreateSuccess,
    adminMainCreateFail,
    clearAdminMainCreated,
    adminMainUpdateRequest,
    adminMainUpdateSuccess,
    adminMainUpdateFail,
    clearAdminMainUpdated,
    adminMainDeleteRequest,
    adminMainDeleteSuccess,
    adminMainDeleteFail,
    clearAdminMainDeleted,
    clearAdminMainDetailsError,
    clearAdminMainArray,
    updatePriceOfAllProRequest,
    updatePriceOfAllProSuccess,
    updatePriceOfAllProFail,
    clearPriceUpdatesAllPro,
    userProdCatRequest,
    userProdCatSuccess,
    userProdCatFail,
    clearLogoutAllAdminData,
    vendorAdminDetailsRequest,
    vendorAdminDetailsSuccess,
    vendorAdminDetailsFail,
    policyAdminDetailsRequest,
    policyAdminDetailsSuccess,
    policyAdminDetailsFail,
} = actions;

export default reducer;