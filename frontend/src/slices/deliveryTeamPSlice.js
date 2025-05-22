import { createSlice } from "@reduxjs/toolkit";

const DeliveryTeamSlice = createSlice({
    name:"deliveryteamp",
    initialState: {
        loading: false,
        myReferEarnings: null,
        error: null,
    },
    reducers: {
        clearAllDeliveryPeopleP(state, action) {
          return {
            ...state,
            myReferEarnings: null,
          }
        },
        myReferEarningsRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        myReferEarningsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                myReferEarnings: action.payload,
            }
        },
        myReferEarningsFail(state, action) {
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
    clearAllDeliveryPeopleP,
    myReferEarningsRequest,
    myReferEarningsSuccess,
    myReferEarningsFail,
   } = actions;

export default reducer;