import React, { useState } from "react";
import Search from "./Search";
import { clearUsersDetails } from "../../slices/userSlice";
import { clearAllOrderData } from "../../slices/orderSlice";
import { clearLogoutAllAdminData } from "../../slices/adminMainSlice";
import { clearAllDeliveryPeople } from "../../slices/deliveryTeamSlice";
import { clearAllDeliveryPeopleP } from "../../slices/deliveryTeamPSlice";
import { logoutClearAllProductData } from "../../slices/productSlice";
import { clearlogOutSellerProd } from "../../slices/productsSlice";
import { clearUserAdAds } from "../../slices/adsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "../compcss/HeaderNav.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);

    setTimeout(() => {
      dispatch(clearUsersDetails());
      dispatch(clearAllOrderData());
      dispatch(clearLogoutAllAdminData());
      dispatch(clearAllDeliveryPeople());
      dispatch(clearAllDeliveryPeopleP());
      dispatch(logoutClearAllProductData());
      dispatch(clearlogOutSellerProd());
      dispatch(clearUserAdAds());
    }, 2000);
  };
  // const logoutHandler = () => {
  //   dispatch(logout);
  //   dispatch(clearUsersDetails());
  //   dispatch(clearAllOrderData());
  //   dispatch(clearLogoutAllAdminData());
  //   dispatch(clearAllDeliveryPeople());
  //   dispatch(clearAllDeliveryPeopleP());
  //   dispatch(logoutClearAllProductData());
  // };

  // const toggleNav = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <nav className="nav-total-box">
      <div className="navbar-head">
        <div className="navbar-logo-box">
          <Link to="/">
            <LazyLoadImage
              src="/images/klaatonwebblogo.png"
              alt="klaatonlogo"
              effect="blur"
              className="navbar-logo-icon"
            />
          </Link>
        </div>

        <div className="main-nav">
          {/* <div className="nav-first-part">
            <ul className={`nav-details ${isOpen ? "open" : ""}`}>
              <IoClose className="mob-nav-close-icon" onClick={toggleNav} />
              <Link to="/" className="nav-home" onClick={toggleNav}>
                Home
              </Link>
              <Link to="/read/about" className="nav-about" onClick={toggleNav}>
                About us
              </Link>
              <Link
                to="/read/partnership"
                className="nav-partnerships"
                onClick={toggleNav}
              >
                Partnerships
              </Link>
              <Link
                to="/read/contact"
                className="nav-contact"
                onClick={toggleNav}
              >
                Contact Us
              </Link>
            </ul>
            <div className="mobile-nav-head" onClick={toggleNav}>
              <FaBarsStaggered className="mob-nav-open-icon" />
            </div>
          </div> */}

          <div className="nav-second-part">
            <div className="nav-below-part">
              <div className="contn">
                <div className="nav-search-box">
                  <Search />
                </div>

                <div className="nav-user-box">
                  {isAuthenticated ? (
                    <Dropdown className="d-inline">
                      <Dropdown.Toggle
                        variant="default text-white pr-5"
                        id="dropdown-basic"
                      >
                        <span>{user.name}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {user.role === "admin" && (
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/admin/dashboard");
                            }}
                            className="text-dark"
                          >
                            Dashboard
                          </Dropdown.Item>
                        )}
                        {user.role === "seller" && (
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/vendor/dashboard");
                            }}
                            className="text-dark"
                          >
                            Vendor Dashboard
                          </Dropdown.Item>
                        )}
                        {user.role === "deliveryboy" && (
                          <Dropdown.Item
                            onClick={() => {
                              navigate("/delivery-team/delivery");
                            }}
                            className="text-dark"
                          >
                            My Earnings
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/myprofile");
                          }}
                          className="text-dark"
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/orders");
                          }}
                          className="text-dark"
                        >
                          Orders
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={logoutHandler}
                          className="text-danger"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Link to="/login" id="login_btn">
                      Login
                    </Link>
                  )}

                  <Link to="/cart">
                    <span id="cart" className="ml-3">
                      Cart
                    </span>
                  </Link>
                  <span className="ml-1" id="cart_count">
                    {cartItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mob-nav-user-box">
        <div className="nav-search-box-mob">
          <Search className="search-comp" />
        </div>

        <div className="nav-user-box-mob">
          {isAuthenticated ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle
                variant="default text-white pr-5"
                id="dropdown-basic"
              >
                <span>{user.name}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user.role === "admin" && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/admin/dashboard");
                    }}
                    className="text-dark"
                  >
                    Dashboard
                  </Dropdown.Item>
                )}
                {user.role === "deliveryboy" && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/delivery-team/delivery");
                    }}
                    className="text-dark"
                  >
                    My Earnings
                  </Dropdown.Item>
                )}
                {user.role === "seller" && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate("/vendor/dashboard");
                    }}
                    className="text-dark"
                  >
                    Vendor Dashboard
                  </Dropdown.Item>
                )}
                <Dropdown.Item
                  onClick={() => {
                    navigate("/myprofile");
                  }}
                  className="text-dark"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/orders");
                  }}
                  className="text-dark"
                >
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login" id="login_btn">
              Login
            </Link>
          )}

          <div className="mob-nav-shop">
            <Link to="/cart">
              <span id="cart" className="ml-3">
                Cart
              </span>
            </Link>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
