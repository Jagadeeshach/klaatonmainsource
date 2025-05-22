import axios from "axios";
import {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
  sellerProductsRequest,
  sellerProductsSuccess,
  sellerProductsFail,
} from "../slices/productsSlice";

import {
  productRequest,
  productSuccess,
  productFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
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
} from "../slices/productSlice";

export const getProducts =
  (keyword, price, category, rating, page) => async (dispatch) => {
    try {
      dispatch(productsRequest());
      let link = `/api/v1/products?page=${page}`;

      if (keyword) {
        link += `&keyword=${keyword}`;
      }

      if (price && Array.isArray(price) && price.length === 2) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }

      if (category) {
        link += `&category=${category}`;
      }

      if (rating) {
        link += `&ratings=${rating}`;
      }

      const { data } = await axios.get(link);
      dispatch(productsSuccess(data));
    } catch (error) {
      dispatch(productsFail(error.response.data.message));
    }
  };

export const getCategoryProducts = (category) => async (dispatch) => {
  // try {
  //   dispatch(productsRequest());
  //   const { data } = await axios.get(
  //     `/api/v1/products?page=&category=${category}`
  //   );
  //   dispatch(productsSuccess(data));
  // } catch (error) {
  //   dispatch(productsFail(error.response.data.message));
  // }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};

export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch(createReviewSuccess(data));
  } catch (error) {
    //Handle Error
    dispatch(createReviewFail(error.response.data.message));
  }
};

export const getAdminProducts = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const { data } = await axios.get(`/api/v1/admin/products?page=${page}&limit=${limit}`);
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response.data.message));
  }
};

// export const getAdminProducts = async (dispatch) => {
//   try {
//     dispatch(adminProductsRequest());
//     const { data } = await axios.get(`/api/v1/admin/products`);
//     dispatch(adminProductsSuccess(data));
//   } catch (error) {
//     dispatch(adminProductsFail(error.response.data.message));
//   }
// };

export const createNewProduct = (formData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());

    // You don't need to declare formData again since it's already passed as a parameter.
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      formData,
      config
    );

    dispatch(newProductSuccess(data));
  } catch (error) {
    dispatch(
      newProductFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch(deleteProductSuccess());
  } catch (error) {
    dispatch(deleteProductFail(error.response.data.message));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await axios.patch(
      `/api/v1/admin/product/${id}`,
      productData
    );
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message));
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch(reviewsRequest());
    const { data } = await axios.get(`/api/v1/admin/reviews`, {
      params: { id },
    });
    dispatch(reviewsSuccess(data));
  } catch (error) {
    dispatch(reviewsFail(error.response.data.message));
  }
};

export const deleteReview = (productId, id) => async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());
    await axios.delete(`/api/v1/admin/review`, {
      params: { productId, id },
    });
    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response.data.message));
  }
};

// ----Seller Actions------
export const getSellerProducts = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(sellerProductsRequest());
    const { data } = await axios.get(`/api/v1/vendor/products?page=${page}&limit=${limit}`);
    dispatch(sellerProductsSuccess(data));
  } catch (error) {
    dispatch(sellerProductsFail(error.response.data.message));
  }
};

export const createNewSellProduct = (formData) => async (dispatch) => {
  try {
    dispatch(newProSellerRequest());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/vendor/product/new",
      formData,
      config
    );

    dispatch(newProSellerSuccess(data));
  } catch (error) {
    dispatch(
      newProSellerFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export const deleteSellerProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteSellerProductRequest());
    await axios.delete(`/api/v1/vendor/product/${id}`);
    dispatch(deleteSellerProductSuccess());
  } catch (error) {
    dispatch(deleteSellerProductFail(error.response.data.message));
  }
};

export const updateSellerProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateSellerProductRequest());
    const { data } = await axios.patch(
      `/api/v1/vendor/product/${id}`,
      productData
    );
    dispatch(updateSellerProductSuccess(data));
  } catch (error) {
    dispatch(updateSellerProductFail(error.response.data.message));
  }
};

export const getSellerProduct = (id) => async (dispatch) => {
  try {
    dispatch(productSellerRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSellerSuccess(data));
  } catch (error) {
    dispatch(productSellerFail(error.response.data.message));
  }
};