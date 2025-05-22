import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Correct import for thunk
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import adReducer from "./slices/adSlice";
import adsReducer from "./slices/adsSlice";
import prodCatSlice from "./slices/productCatSlice";
import adminMainReducer from "./slices/adminMainSlice";
import deliveryTeamReducer from "./slices/deliveryTeamSlice";
import deliveryTeamPReducer from "./slices/deliveryTeamPSlice";

const rootReducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userReducer,
  adState: adReducer,
  adsState: adsReducer,
  prodCatState: prodCatSlice,
  adminMainState: adminMainReducer,
  deliveryTeamState: deliveryTeamReducer,
  deliveryTeamPState: deliveryTeamPReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(thunk),
});

export const persistor = persistStore(store);

export default store;
