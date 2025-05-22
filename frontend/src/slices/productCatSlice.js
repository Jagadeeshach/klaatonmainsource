import { createSlice } from "@reduxjs/toolkit";

const productCatSlice = createSlice({
    name: "productCat",
    initialState: {
        loading: false,
        productCat: [],
    },
    reducers: {
        productCatRequest(state, action){
            return{
                ...state,
                loading: true,
            }
        },
        productCatSuccess(state, action){
            return{
                ...state,
                loading: false,
                productCat: action.payload.products,
                error: null
            }
        },
        productCatFail(state, action){
            return{
                ...state,
                loading: false,
                productCat: [],
                error: action.payload,
            }
        },
        clearProductCat(state, action){
            return{
                ...state,
                productCat: [],
            }
        },
        clearProductErrror(state, action){
            return{
                ...state,
                error: null,
            }
        }
    }
});

const {actions, reducer} = productCatSlice;

export const {
    productCatRequest, 
    productCatSuccess, 
    productCatFail, 
    clearProductCat,
    clearProductErrror
} = actions;

export default reducer;