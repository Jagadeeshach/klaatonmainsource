import { createSlice } from "@reduxjs/toolkit";

const DeliveryTeamSlice = createSlice({
    name:"deliveryteam",
    initialState: {
        loading: false,
        deliveryMan: null,
        isDeliveryManCreated: false,
        isDeliveryManUpdated: false,
        allDeliveryPeople: null,
        updatedDeliveryMan: null,
        getSingleDeliveryMan: null,
        error: null,
    },
    reducers: {
        createDeliveryManRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createDeliveryManSuccess(state, action) {
            return {
                loading: false,
                deliveryMan: action.payload,
                isDeliveryManCreated: true,
            }
        },
        createDeliveryManFail(state, action) {
            return {
                loading: false,
                error: action.payload,
            }
        },
        clearDeliveryMan(state, action) {
            return {
                loading: false,
                deliveryMan: null,
                isDeliveryManCreated: false,
            }
        },
        clearDeliveryTeamError(state, action) {
            return {
                ...state,
                error: null,
            }
        },
        allDeliveryPeopleRequest(state, action) {
            return {
                ...state,
               loading: true,
            }
        },
        allDeliveryPeopleSuccess(state, action) {
            return {
                ...state,
               loading: false,
               allDeliveryPeople: action.payload,
            }
        },
        allDeliveryPeopleFail(state, action) {
            return {
                ...state,
               loading: false,
               error: action.payload,
            }
        },
        clearAllDeliveryPeople(state, action) {
          return {
            ...state,
            allDeliveryPeople: null,
            deliveryMan: null,
            updatedDeliveryMan: null,
            getSingleDeliveryMan: null,

          }
        },
        updateDeliveryManRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateDeliveryManSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isDeliveryManUpdated: true,
                updatedDeliveryMan: action.payload,
            }
        },
        updateDeliveryManFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearUpdatedDeliveryMan(state, action) {
            return {
                ...state,
                isDeliveryManUpdated: false,
            }
        },
        singleDeliveryManRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        singleDeliveryManSuccess(state, action) {
            return {
                ...state,
                loading: false,
                getSingleDeliveryMan: action.payload,
            }
        },
        singleDeliveryManFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
    }

});

const { actions, reducer } = DeliveryTeamSlice;

export const {
    createDeliveryManRequest,
    createDeliveryManSuccess,
    createDeliveryManFail,
    clearDeliveryMan,
    clearDeliveryTeamError,
    allDeliveryPeopleRequest,
    allDeliveryPeopleSuccess,
    allDeliveryPeopleFail,
    clearAllDeliveryPeople,
    updateDeliveryManRequest,
    updateDeliveryManSuccess,
    updateDeliveryManFail,
    clearUpdatedDeliveryMan,
    singleDeliveryManRequest,
    singleDeliveryManSuccess,
    singleDeliveryManFail,
   } = actions;

export default reducer;