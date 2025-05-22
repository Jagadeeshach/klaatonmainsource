import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    sellerProduct: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
    reviews: [],
  },
  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    productSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    createReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearProduct(state, action) {
      return {
        ...state,
        product: {},
      };
    },
    newProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductCreated: true,
      };
    },
    newProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },
    clearProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },
    deleteProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },
    updateProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        isProductUpdated: true,
      };
    },
    updateProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },
    reviewsRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    reviewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },
    reviewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    deleteReviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearReviewDeleted(state, action) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
    newProSellerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newProSellerSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sellerProduct: action.payload.product,
        isProductCreated: true,
      };
    },
    newProSellerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false,
      };
    },
    deleteSellerProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteSellerProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteSellerProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateSellerProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateSellerProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sellerProduct: action.payload.product,
        isProductUpdated: true,
      };
    },
    updateSellerProductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    productSellerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    productSellerSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sellerProduct: action.payload.product,
      };
    },
    productSellerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    logoutClearAllProductData(state, action) {
      return {
        ...state,
        product: {},
        sellerProduct: {},
      }
    }
  },
});

const { actions, reducer } = productSlice;

export const {
  productRequest,
  productSuccess,
  productFail,
  createReviewFail,
  createReviewSuccess,
  createReviewRequest,
  clearReviewSubmitted,
  clearError,
  clearProduct,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  clearProductCreated,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  clearProductDeleted,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  clearProductUpdated,
  reviewsFail,
  reviewsRequest,
  reviewsSuccess,
  deleteReviewFail,
  deleteReviewSuccess,
  deleteReviewRequest,
  clearReviewDeleted,
  newProSellerRequest,
  newProSellerSuccess,
  newProSellerFail,
  deleteSellerProductRequest,
  deleteSellerProductSuccess,
  deleteSellerProductFail,
  updateSellerProductRequest,
  updateSellerProductSuccess,
  updateSellerProductFail,
  productSellerRequest,
  productSellerSuccess,
  productSellerFail,
  logoutClearAllProductData,
} = actions;

export default reducer;
