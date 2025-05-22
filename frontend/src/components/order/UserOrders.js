
// 3 Part(everything fine except pagination)

import { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  userOrders as userOrdersAction,
  userOrderCrFunc,
} from "../../actions/orderActions";
import { userOrderCrClearError } from "../../slices/orderSlice";
import Pagination from "react-js-pagination";
import OrderSteps from "./OrderSteps";
import "../compcss/UserOrder.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function UserOrders() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  const ordersPerPage = 5;

  const {
    userOrders = [],
    totalOrders,
    loading,
    error,
    userOrderCancelReturn,
  } = useSelector((state) => state.orderState);

  const { message } = userOrderCancelReturn;

  const menuRef = useRef(null);  // Create ref to track menu container

  const handleStatusUpdate = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleAction = (orderId, userId, currentStatus, deliveredAt) => {
    if (currentStatus === "Cancel" || currentStatus === "Return") return;

    if (!deliveredAt) {
      dispatch(userOrderCrFunc(orderId, userId, "Cancel")).then(() =>
        handleStatusUpdate(orderId, "Cancel")
      );
    } else {
      const deliveredTime = new Date(deliveredAt);
      const now = new Date();
      const timeDiff = now - deliveredTime;
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

      if (timeDiff <= twoDaysInMs) {
        dispatch(userOrderCrFunc(orderId, userId, "Return")).then(() =>
          handleStatusUpdate(orderId, "Return")
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        position: "bottom-center",
        onOpen: () => {
          dispatch(userOrderCrClearError());
        },
      });
    }

    if (message) {
      toast(message, {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(userOrderCrClearError());
        },
      });
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(userOrdersAction(currentPage, ordersPerPage));
  }, [dispatch, currentPage]);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <h2>My Orders</h2>

      {loading && <p>Loading...</p>}

      {userOrders.map((userOrder) => {
        const currentStatus =
          statusMap[userOrder._id] || userOrder.userOrderStatus;

        return (
          <div key={userOrder._id} className="mt-5 custom-border">
            <OrderSteps status={currentStatus} />

            <div className="menu-container order-user-menu">
              <div
                className="dots"
                onClick={() =>
                  setMenuOpenId(
                    menuOpenId === userOrder._id ? null : userOrder._id
                  )
                }
              >
                <i
                  className="fa fa-ellipsis-v order-user-menu-icon"
                  aria-hidden="true"
                ></i>
              </div>

              {menuOpenId === userOrder._id && (
                <ul ref={menuRef} className="menu-options">
                  <li
                    onClick={() =>
                      handleAction(
                        userOrder._id,
                        userOrder.user,
                        currentStatus,
                        userOrder.deliveredAt
                      )
                    }
                  >
                    {userOrder.userOrderCancel === "Cancel"
                      ? "Order Cancelled"
                      : !userOrder.deliveredAt
                      ? "Cancel Order"
                      : userOrder.userOrderCancel === "Return" &&
                        new Date() - new Date(userOrder.deliveredAt) <=
                          2 * 24 * 60 * 60 * 1000
                      ? "Order Returned"
                      : new Date() - new Date(userOrder.deliveredAt) <=
                        2 * 24 * 60 * 60 * 1000
                      ? "Return Order"
                      : "Time limit exceeded"}
                  </li>
                </ul>
              )}
            </div>

            {currentStatus === "Cancel" ? (
              <p style={{ color: "red", fontWeight: "bold" }}>
                <span>
                  {new Date(userOrder.updatedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                &nbsp;: Order cancelled
              </p>
            ) : currentStatus === "Return" ? (
              <p style={{ color: "blue", fontWeight: "bold" }}>
                <span>
                  {new Date(userOrder.updatedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
                &nbsp;: Order has been returned. The delivery person will
                reach your location soon.
              </p>
            ) : null}

            <p>Order ID: {userOrder.orderUId}</p>
            <p>
              Order Date:{" "}
              {new Date(userOrder.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p>
              Address: {userOrder.shippingInfo.address},{" "}
              {userOrder.shippingInfo.city}, {userOrder.shippingInfo.state},{" "}
              {userOrder.shippingInfo.country}, PIN-
              {userOrder.shippingInfo.postalCode}
            </p>
            <p>Phone: {userOrder.shippingInfo.phoneNo}</p>
            <h4>Ordered Products ({userOrder.orderItems.length})</h4>

            <Swiper
              spaceBetween={50}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 4 },
              }}
              className="swiper-custom-css"
            >
              {userOrder.orderItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <p>
                    {index + 1}/{userOrder.orderItems.length}
                  </p>
                  <p>Product ID: {item.productUId}</p>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.selSizes}</p>
                  <LazyLoadImage
                    src={item.image}
                    alt={`Order ${item._id}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "10px",
                    }}
                    effect="blur"
                  />
                  <p>Price: {item.price}</p>
                </SwiperSlide>
              ))}
            </Swiper>

            <p>Items Price: ₹{userOrder.itemsPrice}</p>
            <p>
              Total Price: <b>₹{userOrder.totalPrice}</b>
            </p>
            <p>
              Status:
              <b
                style={{
                  color:
                    userOrder.paymentInfo.status === "created"
                      ? "green"
                      : "red",
                }}
              >
                {userOrder.paymentInfo.status === "created"
                  ? " Paid Order"
                  : " Processing"}
              </b>
            </p>

            {userOrder.discountDetails?.discountCouponCode && (
              <p>
                Discount Code Applied:
                <b style={{ color: "green", display: "block" }}>
                  {userOrder.discountDetails.discountCouponCode} (
                  {userOrder.discountDetails.discountPercent}) - PAID ₹
                  {userOrder.discountDetails.finalAmountAfterDiscount}
                </b>
              </p>
            )}
          </div>
        );
      })}

      {totalOrders > ordersPerPage && (
        <div className="d-flex flex-column align-items-center mt-5">
          <Pagination
            activePage={currentPage}
            onChange={(pageNumber) => setCurrentPage(pageNumber)}
            totalItemsCount={totalOrders}
            itemsCountPerPage={ordersPerPage}
            pageRangeDisplayed={5}
            itemClass="page-item"
            linkClass="page-link"
          />
          <p className="mt-2">
            Page {currentPage} of {Math.ceil(totalOrders / ordersPerPage)}
          </p>
        </div>
      )}
    </Fragment>
  );
}


// 2nd Part below (Final)

// import { Fragment, useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { userOrders as userOrdersAction, userOrderCrFunc } from "../../actions/orderActions";
// import { userOrderCrClearError } from "../../slices/orderSlice";
// import Pagination from "react-js-pagination";
// import OrderSteps from "./OrderSteps";
// import "../compcss/UserOrder.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// export default function UserOrders() {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [orderId, setOrderId] = useState("");
//   const [userActId, setUserActId] = useState("");
//   const [userOrderValue, setUserOrderValue] = useState("");
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   const ordersPerPage = 5;

//   const { userOrders = [], totalOrders, loading, error, userOrderCancelReturn } = useSelector((state) => state.orderState);
//   const { message } = userOrderCancelReturn;
  
//   const userOrderCrBtn = (orderId, userActId, userOrderValue) => {
//     dispatch(userOrderCrFunc(orderId, userActId, userOrderValue));
//   };

//   const toggleMenu = () => {
//     setOpen(!open);
//   };

//   useEffect(() => {
//     // if(open){
//     //   toast(`If you click Cancel or Return, you can't make any changes.`, {
//     //     type: "warning",
//     //     position: "bottom-center",
//     //     autoClose: 10000,
//     //   });
//     // }

//     if(error){
//       toast(error, {
//         type: "error",
//         position: "bottom-center",
//         onOpen: () => {
//           dispatch(userOrderCrClearError());
//         },
//       });
//     }

//     if(message){
//       toast(message, {
//         type: "success",
//         position: "bottom-center",
//         onOpen: () => {
//           dispatch(userOrderCrClearError());
//         },
//       });
//     }

//     // const handleClickOutside = (event) => {
//     //   if (menuRef.current && !menuRef.current.contains(event.target)) {
//     //     setOpen(false);
//     //   }
//     // };

//     // if (open) {
//     //   document.addEventListener('mousedown', handleClickOutside);
//     // } 

//     // // return () => {
//     // //   document.removeEventListener('mousedown', handleClickOutside);
//     // // };
//     // return () => {
//     //   document.removeEventListener("mousedown", handleClickOutside);
//     // };
//   }, [open, error, message]);

//   useEffect(() => {
//     dispatch(userOrdersAction(currentPage, ordersPerPage));

//   }, [dispatch, currentPage]);

//   return (
//     <Fragment>
//       <h2>My Orders</h2>

//       {loading && <p>Loading...</p>}
//       {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

//       {userOrders.map((userOrder) => (
//         <div key={userOrder._id} className="mt-5 custom-border">
//           <OrderSteps status={userOrder.userOrderStatus} />
          
//           <div className="menu-container order-user-menu" ref={menuRef}>
//             <div className="dots"  onClick={() => {toggleMenu()}}>
//               <i className="fa fa-ellipsis-v order-user-menu-icon" aria-hidden="true" ></i>
//             </div>
//             {open && (
//               <ul className="menu-options">
//                 <li
//                   onClick={() => {
//                     if (userOrder.userOrderCancel === "Cancel" || userOrder.userOrderCancel === "Return") return;

//                     if (!userOrder.deliveredAt) {
//                     userOrderCrBtn(userOrder._id, userOrder.user, "Cancel");
//                     } else {
//                       const deliveredTime = new Date(userOrder.deliveredAt);
//                       const now = new Date();
//                       const timeDiff = now - deliveredTime;
//                       const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;

//                       if (timeDiff <= twoDaysInMs) {
//                        userOrderCrBtn(userOrder._id, userOrder.user, "Return");
//                       }
//                     }
//                   }}
//                 >
//                   {userOrder.userOrderCancel === "Cancel"
//                     ? "Order Cancelled"
//                     : !userOrder.deliveredAt
//                     ? "Cancel Order"
//                     : userOrder.userOrderCancel === "Return" 
//                     && new Date() - new Date(userOrder.deliveredAt) <= 2 * 24 * 60 * 60 * 1000
//                     ? "Order Returned"
//                     : new Date() - new Date(userOrder.deliveredAt) <= 2 * 24 * 60 * 60 * 1000
//                     ? "Return Order"
//                     : "Time limit exceeded"}
//                 </li>
//               </ul>
//             )}
//           </div>
//            {userOrder.userOrderStatus === "Cancel" ? (
//             <p style={{ color: "red", fontWeight: "bold" }}>
//               <span>
//               {new Date(userOrder.updatedAt).toLocaleString('en-IN', {
//               day: '2-digit',
//               month: 'short',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true
//              })}
//              </span>&nbsp;: Order cancelled</p>
//             ) : userOrder.userOrderStatus === "Return" ? (
//             <p style={{ color: "blue", fontWeight: "bold" }}>
//               <span>
//               {new Date(userOrder.updatedAt).toLocaleString('en-IN', {
//               day: '2-digit',
//               month: 'short',
//               year: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true
//               })}
//              </span>&nbsp;:
//             Order has been returned, The delivery person will be reaching your location soon.
//           </p>
//           ) : null}
//           <p>Order ID: {userOrder.orderUId}</p>
//           <p>
//             Order Date: {new Date(userOrder.createdAt).toLocaleString('en-IN', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//            })}
//           </p>
//           <p>
//             Address: {userOrder.shippingInfo.address}, {userOrder.shippingInfo.city}, {userOrder.shippingInfo.state}, {userOrder.shippingInfo.country}, PIN-{userOrder.shippingInfo.postalCode}
//           </p>
//           <p>Phone: {userOrder.shippingInfo.phoneNo}</p>
//           <h4>Ordered Products ({userOrder.orderItems.length})</h4>

//           <Swiper
//             spaceBetween={50}
//             loop={true}
//             autoplay={{ delay: 2500, disableOnInteraction: false }}
//             breakpoints={{
//               768: { slidesPerView: 1 },
//               1024: { slidesPerView: 4 },
//             }}
//             className="swiper-custom-css"
//           >
//             {userOrder.orderItems.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <p>{index + 1}/{userOrder.orderItems.length}</p>
//                 <p>Product ID: {item.productUId}</p>
//                 <p>{item.name}</p>
//                 <p>Quantity: {item.quantity}</p>
//                 <p>Size: {item.selSizes}</p>
//                 <LazyLoadImage
//                   src={item.image}
//                   alt={`Order ${item._id}`}
//                   style={{ width: "200px", height: "200px", marginTop: "10px" }}
//                   effect="blur"
//                 />
//                 <p>Price: {item.price}</p>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <p>Items Price: &#8377;{userOrder.itemsPrice}</p>
//           <p>
//             Total Price: <b>&#8377;{userOrder.totalPrice}</b>
//           </p>
//           <p>
//             Status:
//             <b style={{ color: userOrder.paymentInfo.status === "created" ? "green" : "red" }}>
//               {userOrder.paymentInfo.status === "created" ? " Paid Order" : " Processing"}
//             </b>
//           </p>

//           {userOrder.discountDetails?.discountCouponCode && (
//            <p>
//             Discount Code Applied:
//              <b style={{ color: "green", display: "block" }}>
//              {userOrder.discountDetails.discountCouponCode} ({userOrder.discountDetails.discountPercent}) - PAID ₹
//              {userOrder.discountDetails.finalAmountAfterDiscount}
//             </b>
//            </p>
//           )}
//         </div>
//       ))}

//       {totalOrders > ordersPerPage && (
//         <div className="d-flex flex-column align-items-center mt-5">
//           <Pagination
//             activePage={currentPage}
//             onChange={(pageNumber) => setCurrentPage(pageNumber)}
//             totalItemsCount={totalOrders}
//             itemsCountPerPage={ordersPerPage}
//             pageRangeDisplayed={5}
//             itemClass="page-item"
//             linkClass="page-link"
//           />
//           <p className="mt-2">Page {currentPage} of {Math.ceil(totalOrders / ordersPerPage)}</p>
//         </div>
//       )}
//     </Fragment>
//   );
// }

// 1Part below


// import { Fragment, useEffect } from "react";
// import MetaData from "../layouts/MetaData";
// import { MDBDataTable } from "mdbreact";
// import { useSelector, useDispatch } from "react-redux";
// import { userOrders as userOrdersAction } from "../../actions/orderActions";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import OrderSteps from "./OrderSteps";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// const NoUnderlineLink = styled(Link)`
//   text-decoration: none;

//   &:hover {
//     text-decoration: none;
//   }
// `;

// export default function UserOrders() {
//   const { userOrders = [] } = useSelector((state) => state.orderState);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(userOrdersAction);
//   }, []);

//   return (
//     <Fragment>
//       {userOrders.map((userOrder) => (
//         <div key={userOrder._id} className="mt-5 custom-border">
//           <OrderSteps status={userOrder.orderStatus} />
//           <p>Order ID: {userOrder.orderUId}</p>
//           <p>
//             Address: {userOrder.shippingInfo.address},
//             {userOrder.shippingInfo.city}, {userOrder.shippingInfo.state},
//             {userOrder.shippingInfo.country}, PIN-
//             {userOrder.shippingInfo.postalCode}
//           </p>
//           <p>Phone: {userOrder.shippingInfo.phoneNo}</p>
//           <h4>Ordered Products ({userOrder.orderItems.length})</h4>
//           <Swiper
//             spaceBetween={50} // The space between slides in pixels
//             loop={true} // Enabling loop (infinite scrolling)
//             autoplay={{
//               // Autoplay options
//               delay: 2500, // Delay between slides in milliseconds
//               disableOnInteraction: false, // Autoplay continues after interaction
//             }}
//             breakpoints={{
//               // When the screen width is <= 768px (mobile devices)
//               768: {
//                 slidesPerView: 1, // Show 1 slide per view on mobile
//               },
//               // When the screen width is > 768px (for large devices like laptops)
//               1024: {
//                 slidesPerView: 4, // Show 4 slides per view on larger devices
//               },
//             }}
//             className="swipper-custome-css"
//           >
//             {userOrder.orderItems.map((tet, index) => (
//               <SwiperSlide key={index}>
//                 <NoUnderlineLink
//                   className="custom-inside-border inline"
//                   to={`/product/${tet.product}`}
//                 >
//                   <p>
//                     {index + 1}/{userOrder.orderItems.length}
//                   </p>
//                   <p>Product ID: {tet.productUId}</p>
//                   <p>{tet.name}</p>
//                   <p>Quantity: {tet.quantity}</p>
//                   <p>Size: {tet.selSizes}</p>
//                   <LazyLoadImage
//                     src={tet.image}
//                     alt={`Order ${tet._id}`}
//                     style={{
//                       width: "200px",
//                       height: "auto",
//                       marginTop: "10px",
//                     }}
//                     effect="blur" 

//                   />
//                   <p>Price: {tet.price}</p>
//                 </NoUnderlineLink>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//           <p>Items Price: &#8377;{userOrder.itemsPrice}</p>
//           <p>
//             Total Price : <b>&#8377;{userOrder.totalPrice}</b>
//           </p>
//           <p>
//             Payment Status:
//             <b
//               style={{
//                 color:
//                   userOrder.paymentInfo.status === "created" ? "green" : "red",
//               }}
//             >
//               {userOrder.paymentInfo.status === "created"
//                 ? " Paid"
//                 : " Processing"}
//             </b>
//           </p>
//         </div>
//       ))}
//     </Fragment>
//   );
// }
