import axios from "axios";
import {
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
  sellerOrdersRequest,
  sellerOrdersSuccess,
  sellerOrdersFail,
  deleteSellerOrderRequest,
  deleteSellerOrderSuccess,
  deleteSellerOrderFail,
  updateSellerOrderRequest,
  updateSellerOrderSuccess,
  updateSellerOrderFail,
  orderSellerDetailRequest,
  orderSellerDetailSuccess,
  orderSellerDetailFail,
  discountDataRequest,
  discountDataSuccess,
  discountDataFail,
  adminProdOrdersDataRequest,
  adminProdOrdersDataSuccess,
  adminProdOrdersDataFail,
  sellerProdOrdersDataRequest,
  sellerProdOrdersDataSuccess,
  sellerProdOrdersDataFail,
  userOrderCancelReturnRequest,
  userOrderCancelReturnSuccess,
  userOrderCancelReturnFail,
} from "../slices/orderSlice";

import {
  myReferEarningsRequest,
  myReferEarningsSuccess,
  myReferEarningsFail,
} from "../slices/deliveryTeamPSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch(createOrderSuccess(data));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};

export const userOrders = (page = 1, limit = 5) => async (dispatch) => {
  try {
    dispatch(userOrdersRequest());

    const { data } = await axios.get(`/api/v1/myorders?page=${page}&limit=${limit}`);

    dispatch(userOrdersSuccess({ orders: data.orders, totalOrders: data.totalOrders }));
  } catch (error) {
    dispatch(userOrdersFail(error.response?.data?.message || "Something went wrong"));
  }
};

// export const userOrderCrFunc = (orderId, userActId, userOrderValue) => async (dispatch) => {
//   try {
//     dispatch(userOrderCancelReturnRequest());
//     const { data } = await axios.put(`/api/v1/order/cancel/return/${orderId}/${userActId}`, {userOrderValue});
//     dispatch(userOrderCancelReturnSuccess(data.order));
//   } catch (error) {
//     dispatch(userOrderCancelReturnFail(error.response.data.message));
//   }
// };
export const userOrderCrFunc = (orderId, userActId, userOrderValue) => async (dispatch) => {
  try {
    dispatch(userOrderCancelReturnRequest());
    const { data } = await axios.put(`/api/v1/order/cancel/return/${orderId}/${userActId}`, {
      userOrderValue,
    });
    dispatch(userOrderCancelReturnSuccess(data));
  } catch (error) {
    dispatch(
      userOrderCancelReturnFail(error.response.data.message)
    );
  }
};

export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(orderDetailSuccess(data));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

export const adminOrders = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(adminOrdersRequest());
    const { data } = await axios.get(`/api/v1/admin/orders?page=${page}&limit=${limit}`);
    dispatch(adminOrdersSuccess(data));
  } catch (error) {
    dispatch(adminOrdersFail(error.response.data.message));
  }
};

// export const adminOrders = async (dispatch) => {
//   try {
//     dispatch(adminOrdersRequest());
//     const { data } = await axios.get("/api/v1/admin/orders");
//     dispatch(adminOrdersSuccess(data));
//   } catch (error) {
//     dispatch(adminOrdersFail(error.response.data.message));
//   }
// };

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch(deleteOrderSuccess());
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail(error.response.data.message));
  }
};

export const getAllAdminOrderAndProData = async (dispatch) => {
  try {
    dispatch(adminProdOrdersDataRequest());
    const { data } = await axios.get(`/api/v1/admin/orders-products-data`);
    dispatch(adminProdOrdersDataSuccess(data.adminData))
  } catch (error) {
    dispatch(adminProdOrdersDataFail(error.response.data.message));
  }
}

export const getAllSellerOrderAndProData = async (dispatch) => {
  try {
    dispatch(sellerProdOrdersDataRequest());
    const { data } = await axios.get(`/api/v1/vendor/products-orders-data`);
    dispatch(sellerProdOrdersDataSuccess(data.sellerData))
  } catch (error) {
    dispatch(sellerProdOrdersDataFail(error.response.data.message));
  }
}

//----Seller Order------
export const sellerOrders = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(sellerOrdersRequest());
    const { data } = await axios.get(`/api/v1/vendor/orders?page=${page}&limit=${limit}`);
    dispatch(sellerOrdersSuccess(data));
  } catch (error) {
    dispatch(sellerOrdersFail(error.response?.data?.message));
  }
};

// export const sellerOrders = async (dispatch) => {
//   try {
//     dispatch(sellerOrdersRequest());
//     const { data } = await axios.get("/api/v1/vendor/orders");
//     dispatch(sellerOrdersSuccess(data));
//   } catch (error) {
//     dispatch(sellerOrdersFail(error.response.data.message));
//   }
// };

export const updateSellerOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch(updateSellerOrderRequest());
    const { data } = await axios.put(`/api/v1/vendor/order/${id}`, orderData);
    dispatch(updateSellerOrderSuccess(data));
  } catch (error) {
    dispatch(updateSellerOrderFail(error.response.data.message));
  }
};

export const deleteSellerOrder = (id) => async (dispatch) => {
  try {
    dispatch(deleteSellerOrderRequest());
    await axios.delete(`/api/v1/vendor/order/${id}`);
    dispatch(deleteSellerOrderSuccess());
  } catch (error) {
    dispatch(deleteSellerOrderFail(error.response.data.message));
  }
};

export const orderSellerDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderSellerDetailRequest());
    const { data } = await axios.get(`/api/v1/vendor/order/${id}`);
    dispatch(orderSellerDetailSuccess(data));
  } catch (error) {
    dispatch(orderSellerDetailFail(error.response.data.message));
  }
};

export const getSingleDiscount = (formData) => async (dispatch) => {
  try {
    dispatch(discountDataRequest());

    const { data } = await axios.post(`/api/v1/discount/coupon`, formData);

    dispatch(discountDataSuccess(data.finalData)); 
  } catch (error) {
    dispatch(discountDataFail(error.response.data.message));
  }
};

// ----delivery team ----

export const getMyTotalEarnings = async (dispatch) => {
  try {
    dispatch(myReferEarningsRequest());
    const { data } = await axios.get("/api/v1/myrefer/orders");
    dispatch(myReferEarningsSuccess(data.referInfo));
  } catch (error) {
    dispatch(myReferEarningsFail(error.response.data.message));
  }
};

// export const userOrders = async (dispatch) => {
//   try {
//     dispatch(userOrdersRequest());
//     const { data } = await axios.get("/api/v1/myorders");
//     dispatch(userOrdersSuccess(data));
//   } catch (error) {
//     dispatch(userOrdersFail(error.response.data.message));
//   }
// };