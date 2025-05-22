import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    loading: false,
    ads: [],
  },
  reducers: {
    adsRequest(state, action) {
      return {
        loading: true,
      };
    },
    adsSuccess(state, action) {
      return {
        loading: false,
        ads: action.payload.data,
      };
    },
    adsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    adminAdsRequest(state, action) {
      return {
        loading: true,
      };
    },
    adminAdsSuccess(state, action) {
      return {
        loading: false,
        ads: action.payload.data,
      };
    },
    adminAdsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearAdminAdError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearUserAdAds(state, action) {
      return {
        ads: [],
      };
    },
  },
});

const { actions, reducer } = adsSlice;

export const {
  adsRequest,
  adsSuccess,
  adsFail,
  adminAdsRequest,
  adminAdsSuccess,
  adminAdsFail,
  clearAdminAdError,
  clearUserAdAds
} = actions;

export default reducer;
