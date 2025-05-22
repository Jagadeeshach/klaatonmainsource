import { createSlice } from "@reduxjs/toolkit";

const adSlice = createSlice({
  name: "ad",
  initialState: {
    loading: false,
    ad: {},
    isAdCreated: false,
    isAdDeleted: false,
    isAdUpdated: false,
  },
  reducers: {
    newAdRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newAdSuccess(state, action) {
      return {
        ...state,
        loading: false,
        ad: action.payload.ad,
        isAdCreated: true,
      };
    },
    newAdFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAdCreated: false,
      };
    },
    clearAdCreated(state, action) {
      return {
        ...state,
        isAdCreated: false,
      };
    },
    clearMyError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    adRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    adSuccess(state, action) {
      return {
        ...state,
        loading: false,
        ad: action.payload.ad,
      };
    },
    adFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearAd(state, action) {
      return {
        ...state,
        ad: {},
      };
    },
    deleteAdRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteAdSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAdDeleted: true,
      };
    },
    deleteAdFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearAdDeleted(state, action) {
      return {
        ...state,
        isAdDeleted: false,
      };
    },
    updateAdRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateAdSuccess(state, action) {
      return {
        ...state,
        loading: false,
        ad: action.payload.ad,
        isAdUpdated: true,
      };
    },
    updateAdFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearAdUpdated(state, action) {
      return {
        ...state,
        isAdUpdated: false,
      };
    },
  },
});

const { actions, reducer } = adSlice;

export const {
  newAdRequest,
  newAdSuccess,
  newAdFail,
  clearAdCreated,
  clearMyError,
  adRequest,
  adSuccess,
  adFail,
  clearAd,
  clearAdUpdated,
  clearAdDeleted,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail,
  updateAdRequest,
  updateAdFail,
  updateAdSuccess,
} = actions;

export default reducer;
