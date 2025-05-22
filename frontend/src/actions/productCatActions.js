import axios from "axios";
import {
    productCatRequest, 
    productCatSuccess, 
    productCatFail} from "../slices/productCatSlice";

export const getCatProducts = (category)=> async(dispatch)=>{
    try {
       dispatch((productCatRequest()));
       const { data } = await axios.get(`/api/v1/productcat/${category}`);
       dispatch(productCatSuccess(data));
    } catch(error){
        dispatch(productCatFail(error.response.data.message))
    }
}