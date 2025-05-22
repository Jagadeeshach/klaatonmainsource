import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    sellerProducts: [],
    adminProds: [],
    products: [],
    totalPages: 1,
    currentPage: 1,
    resPerPage: 0,
    outOfStock: 0,
    adminProdCount: 0,
    sellerProdCount: 0,
    error: null,
  },
  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    adminProductsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    adminProductsSuccess(state, action) {
      return {
        loading: false,
        adminProds: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        resPerPage: action.payload.resPerPage,
        adminProdCount: action.payload.count,
      };
    },
    adminProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearAdminError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    sellerProductsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sellerProductsSuccess(state, action) {
      return {
        loading: false,
        sellerProducts: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        resPerPage: action.payload.resPerPage,
        sellerProdCount: action.payload.count,
        outOfStock: action.payload.outOfStockCount,
      };
    },
    sellerProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearSellerError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearlogOutSellerProd(state, action) {
      return {
        ...state,
        adminProds: [],
        sellerProducts: [],
        totalPages: 0,
        currentPage: 0,
        resPerPage: 0,
        outOfStock: 0,
        adminProdCount: 0,
        sellerProdCount: 0,
      }
    }
  },
});

const { actions, reducer } = productsSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
  clearAdminError,
  sellerProductsRequest,
  sellerProductsSuccess,
  sellerProductsFail,
  clearSellerError,
  clearlogOutSellerProd,
} = actions;

export default reducer;
