import axios from "axios";
import {
    createDeliveryManRequest,
    createDeliveryManSuccess,
    createDeliveryManFail,
    allDeliveryPeopleRequest,
    allDeliveryPeopleSuccess,
    allDeliveryPeopleFail,
    updateDeliveryManRequest,
    updateDeliveryManSuccess,
    updateDeliveryManFail,
    singleDeliveryManRequest,
    singleDeliveryManSuccess,
    singleDeliveryManFail,
} from "../slices/deliveryTeamSlice";

export const createNewReferer = (formData) => async(dispatch) => {
    try {
        dispatch(createDeliveryManRequest());
        const { data } = await axios.post("/api/v1/admin/ratecontrol/referer/create", formData);
        dispatch(createDeliveryManSuccess(data.updatedUser));
    } catch(error) {
        dispatch(createDeliveryManFail(error.response.data.message));
    }
};

export const getAllDeliveryPeople = async(dispatch) => {
    try {
        dispatch(allDeliveryPeopleRequest());
        const { data } = await axios.get("/api/v1/admin/ratecontrol/all/referers ");
        dispatch(allDeliveryPeopleSuccess(data.filteredUsers));
    } catch(error) {
        dispatch(allDeliveryPeopleFail(error.response.data.message));
    }
};

export const updateReferer = (id,formData) => async(dispatch) => {
    try {
        dispatch(updateDeliveryManRequest());
        const { data } = await axios.put(`/api/v1/admin/ratecontrol/referer/update/${id}`, formData);
        dispatch(updateDeliveryManSuccess(data.updatedUser));
    } catch(error) {
        dispatch(updateDeliveryManFail(error.response.data.message));
    }
};

export const getSingleDeliveryManFunc = (id) => async (dispatch) => {
    try {
        dispatch(singleDeliveryManRequest());
        const { data } = await axios.get(`/api/v1/admin/ratecontrol/referer/one/${id}`);
        dispatch(singleDeliveryManSuccess(data.user));
    } catch(error) {
        dispatch(singleDeliveryManFail(error.response.data.message));
    }
}