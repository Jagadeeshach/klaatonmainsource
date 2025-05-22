import axios from "axios";
import {
  newAdSuccess,
  newAdRequest,
  newAdFail,
  adRequest,
  adSuccess,
  adFail,
  deleteAdRequest,
  deleteAdSuccess,
  deleteAdFail,
  updateAdRequest,
  updateAdSuccess,
  updateAdFail,
} from "../slices/adSlice";

import {
  adsRequest,
  adsFail,
  adsSuccess,
  adminAdsRequest,
  adminAdsSuccess,
  adminAdsFail,
} from "../slices/adsSlice";

export const createNewAd = (formData) => async (dispatch) => {
  try {
    dispatch(newAdRequest);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/v1/admin/ad/new", formData, config);
    dispatch(newAdSuccess(data));
  } catch (error) {
    dispatch(
      newAdFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export const getAds = async (dispatch) => {
  try {
    dispatch(adminAdsRequest());
    const { data } = await axios.get("/api/v1/admin/ads");
    dispatch(adminAdsSuccess(data));
  } catch (error) {
    dispatch(adminAdsFail(error.response.data.message));
  }
};


export const getAd = (id) => async (dispatch) => {
  try {
    dispatch(adRequest());
    const { data } = await axios.get(`/api/v1/admin/ad/${id}`);
    dispatch(adSuccess(data));
  } catch (error) {
    dispatch(adFail(error.response.data.message));
  }
};

export const getAdminAds = async (dispatch) => {
  try {
    dispatch(adRequest());
    const { data } = await axios.get("/api/v1/admin/ads");
    dispatch(adSuccess(data));
  } catch (error) {
    dispatch(adFail(error.response.data.message));
  }
};

export const deleteAd = (id) => async (dispatch) => {
  try {
    dispatch(deleteAdRequest());
    await axios.delete(`/api/v1/admin/ad/${id}`);
    dispatch(deleteAdSuccess());
  } catch (error) {
    dispatch(deleteAdFail(error.response.data.message));
  }
};

export const updateAd = (id, adData) => async (dispatch) => {
  try {
    dispatch(updateAdRequest());
    const { data } = await axios.patch(`/api/v1/admin/ad/${id}`, adData);
    dispatch(updateAdSuccess(data));
  } catch (error) {
    dispatch(updateAdFail(error.response.data.message));
  }
};
