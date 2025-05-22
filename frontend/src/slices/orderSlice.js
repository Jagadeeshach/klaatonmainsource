import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    orderSellerDetail: {},
    userOrders: [],
    adminOrders: [],
    sellerOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
    isDiscountData: null,
    totalOrders: 0,
    error: null,
    totalPages: 0,
    currentPage: 1,
    // sellerOrders: [],
    // totalOrders: 0,
    // totalPages: 0,
    // currentPage: 1,
    adminProdOrdersData: {},
    sellerProdOrdersData: {},
    userOrderCancelReturn: {},
  },
  reducers: {
    createOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    userOrdersRequest(state) {
      return { ...state, loading: true, error: null };
    },
    userOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders, 
        totalOrders: action.payload.totalOrders, 
      };
    },
    userOrdersFail(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    orderDetailRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrdersRequest(state) {
      return { 
        ...state, 
        loading: true, 
      };
    },
    adminOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
        totalOrders: action.payload.totalOrders,
        totalPages: action.payload.pages,
        currentPage: action.payload.currentPage,
      };
    },
    adminOrdersFail(state, action) {
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
      };
    },
    // adminOrdersRequest(state, action) {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    // adminOrdersSuccess(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     adminOrders: action.payload.orders,
    //   };
    // },
    // adminOrdersFail(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    // },
    deleteOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearOrderDeleted(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },
    clearOrderUpdated(state, action) {
      return {
        ...state,
        isOrderUpdated: false,
      };
    },
    // sellerOrdersRequest(state, action) {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // },
    // sellerOrdersSuccess(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     sellerOrders: action.payload.orders,
    //   };
    // },
    // sellerOrdersFail(state, action) {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    // },
    sellerOrdersRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    sellerOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sellerOrders: action.payload.orders,
        totalOrders: action.payload.totalOrders,
        totalPages: action.payload.pages,
        currentPage: action.payload.currentPage,
      }
    },
    sellerOrdersFail(state, action) {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
    },
    deleteSellerOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteSellerOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteSellerOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateSellerOrderRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateSellerOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateSellerOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderSellerDetailRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    orderSellerDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderSellerDetail: action.payload.order,
      };
    },
    orderSellerDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearSellerOrderDetails(state, action) {
      return {
        ...state,
        loading: false,
        orderSellerDetail: {},
      };
    },
    discountDataRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    discountDataSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isDiscountData: action.payload,
      };
    },
    discountDataFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearDiscountData(state, action) {
      return {
        ...state,
        isDiscountData: null,
      }
    },
    clearAllOrderData(state, action) {
      return {
        ...state,
        orderDetail: {},
        orderSellerDetail: {},
        userOrders: [],
        adminOrders: [],
        sellerOrders: [],
        adminProdOrdersData: {},
        sellerProdOrdersData: {},
      }
    },
    adminProdOrdersDataRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    adminProdOrdersDataSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminProdOrdersData: action.payload,
      }
    },
    adminProdOrdersDataFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    sellerProdOrdersDataRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    sellerProdOrdersDataSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sellerProdOrdersData: action.payload,
      }
    },
    sellerProdOrdersDataFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    userOrderCancelReturnRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    userOrderCancelReturnSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrderCancelReturn: action.payload,
      }
    },
    userOrderCancelReturnFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
    userOrderCrClearError(state, action) {
      return {
        ...state,
        error: null,
        userOrderCancelReturn: {
          ...state.userOrderCancelReturn,
          message: null,
        },
      };
    }
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  clearError,
  userOrdersFail,
  userOrdersSuccess,
  userOrdersRequest,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  clearOrderDeleted,
  clearOrderUpdated,
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
  clearSellerOrderDetails,
  discountDataRequest,
  discountDataSuccess,
  discountDataFail,
  clearDiscountData,
  clearAllOrderData,
  adminProdOrdersDataRequest,
  adminProdOrdersDataSuccess,
  adminProdOrdersDataFail,
  sellerProdOrdersDataRequest,
  sellerProdOrdersDataSuccess,
  sellerProdOrdersDataFail,
  userOrderCancelReturnRequest,
  userOrderCancelReturnSuccess,
  userOrderCancelReturnFail,
  userOrderCrClearError,
} = actions;

export default reducer;
