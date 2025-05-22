import "./App.css";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/product/ProductDetail";
import ProductSearch from "./components/product/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import SellerRoute from "./components/route/SellerRoute";
import DeliveryTeamRoute from "./components/route/DeliveryTeamRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";
import Adboard from "./components/admin/Adboard";
import NewAd from "./components/admin/NewAd";
import AdList from "./components/admin/AdList";
import UpdateAd from "./components/admin/UpdateAd";
import AdminMainList from "./components/admin/AdminMainList";
import AdminMainNew from "./components/admin/AdminMainNew";
import AdminMainUpdate from "./components/admin/AdminMainUpdate";
import DeliveryTeamNew from "./components/admin/DeliveryTeamNew";
import DeliveryTeamUpdate from "./components/admin/DeliveryTeamUpdate";
import DeliveryTeamList from "./components/admin/DeliveryTeamList";

import AboutUser from "./components/usercomp/AboutUser";
import PartnershipUser from "./components/usercomp/PartnershipUser";
import ContactUser from "./components/usercomp/ContactUser";
import TermsUser from "./components/usercomp/TermsUser";
import RefundUser from "./components/usercomp/RefundUser";
import PrivacyUser from "./components/usercomp/PrivacyUser";
import ReturnUser from "./components/usercomp/ReturnUser";

import VendorBoard from "./components/seller/VendorBoard";
import ProductLit from "./components/seller/ProductLit";
import NewProd from "./components/seller/NewProd";
import UpdateProd from "./components/seller/UpdateProd";
import Orderlit from "./components/seller/OrderLit";
import UpdateOrdr from "./components/seller/UpdateOrdr";

import DeliveryTeam from "./components/deliveryteam/DeliveryTeam";

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container">
            <ToastContainer theme="dark" />
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Adboard />} />
              <Route path="/read/about" element={<AboutUser />} />
              <Route path="/read/partnership" element={<PartnershipUser />} />
              <Route path="/read/contact" element={<ContactUser />} />
              <Route path="/policy/terms" element={<TermsUser />} />
              <Route path="/policy/refund" element={<RefundUser />} />
              <Route path="/policy/privacy" element={<PrivacyUser />} />
              <Route path="/policy/return" element={<ReturnUser />} />

              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/myprofile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myprofile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          {/* Admin Routes */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/ads"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/ads/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewAd />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/ad/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateAd />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrderList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ReviewList />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/admincontrols"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminMainList />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/admincontrols/new"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminMainNew />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/admincontrols/update/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminMainUpdate />
                </ProtectedRoute>
              }
            ></Route>

            {/* Delivery Team */}

            <Route
              path="/admin/deliveryteam/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <DeliveryTeamNew />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/deliveryteam/update/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <DeliveryTeamUpdate />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/deliveryteam/list"
              element={
                <ProtectedRoute isAdmin={true}>
                  <DeliveryTeamList />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>

          {/* Seller Routes */}
          <Routes>
            <Route
              path="/vendor/dashboard"
              element={
                <SellerRoute isSeller={true}>
                  <VendorBoard />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/products"
              element={
                <SellerRoute isSeller={true}>
                  <ProductLit />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/products/create"
              element={
                <SellerRoute isSeller={true}>
                  <NewProd />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/product/:id"
              element={
                <SellerRoute isSeller={true}>
                  <UpdateProd />
                </SellerRoute>
              }
            ></Route>

            <Route
              path="/vendor/orders"
              element={
                <SellerRoute isSeller={true}>
                  <Orderlit />
                </SellerRoute>
              }
            ></Route>
            <Route
              path="/vendor/order/:id"
              element={
                <SellerRoute isSeller={true}>
                  <UpdateOrdr />
                </SellerRoute>
              }
            ></Route>
          </Routes>

          {/* Delivery Team */}

          <Routes>
            <Route
              path="/delivery-team/delivery"
              element={
                <DeliveryTeamRoute isDeliveryboy={true}>
                  <DeliveryTeam />
                </DeliveryTeamRoute>
              }
            ></Route>
          </Routes>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
