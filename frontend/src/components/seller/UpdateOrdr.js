import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  orderSellerDetail as orderSellerDetailAction,
  updateSellerOrder,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderSellerDetail } = useSelector(
    (state) => state.orderState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    paymentInfo = {},
    grandTotal,
  } = orderSellerDetail;

  const isPaid = paymentInfo?.status === "created";

  const [orderStatus, setOrderStatus] = useState("Processing");

  // **Fetch Order Details & Handle Updates**
  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated Successfully", {
        position: "bottom-center",
      });
      dispatch(clearOrderUpdated());
      navigate("/vendor/orders");
    } else if (error) {
      toast.error(error, { position: "bottom-center" });
      dispatch(clearError());
    } else {
      dispatch(orderSellerDetailAction(orderId));
    }
  }, [isOrderUpdated, error, dispatch, orderId, navigate]);

  // **Set Order Status Based on Items**
  useEffect(() => {
    if (orderSellerDetail._id) {
      if (orderItems.length > 0) {
        const statuses = orderItems.map((item) => item.orderStatus);
        const overallStatus = statuses.every((s) => s === "Delivered")
          ? "Delivered"
          : statuses.includes("Shipped")
          ? "Shipped"
          : statuses.includes("Packing")
          ? "Packing"
          : "Processing";
        setOrderStatus(overallStatus);
      } else {
        setOrderStatus(orderSellerDetail.orderStatus);
      }
    }
  }, [orderSellerDetail, orderItems]);

  // **Handle Order Status Update**
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSellerOrder(orderId, { orderStatus }));
  };

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderSellerDetail.orderUId}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p><b>Name:</b> {shippingInfo.ordererName}</p>
              <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
              <p className="mb-4">
                <b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}
              </p>
              <p><b>Amount:</b> &#8377;{grandTotal}</p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p className={orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>
              <hr />
              <div className="cart-item my-1">
                {orderItems.map((item, index) => (
                  <div className="row my-5" key={item.product || index}>
                    <div className="col-4 col-lg-2">
                      <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>
                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.product}`}>
                        {item.name}&nbsp;ID:{item.productUId}
                      </Link>
                    </div>
                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>&#8377;{item.baseSellerPrice}</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>{item.quantity} Piece(s)</p>
                    </div>
                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <p>Size: {item.selSizes}</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>

            <div className="col-12 col-lg-3 mt-5">
              <h4 className="my-4">Order Status</h4>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                disabled={loading}
                onClick={submitHandler}
                className="btn btn-primary btn-block"
              >
                Update Status
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}






// sdgfg
// import { Fragment, useEffect, useState } from "react";
// import Sidebar from "./Sidebr";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//     orderSellerDetail as orderSellerDetailAction,
//   updateSellerOrder,
// } from "../../actions/orderActions";
// import { toast } from "react-toastify";
// import { clearOrderUpdated, clearError } from "../../slices/orderSlice";

// export default function UpdateOrder() {
//   const { loading, isOrderUpdated, error, orderSellerDetail } = useSelector(
//     (state) => state.orderState
//   );

//   const {
//     user = {},
//     orderItems = [],
//     shippingInfo = {},
//     paymentInfo = {},
//     grandTotal,
//   } = orderSellerDetail;
//   const isPaid = paymentInfo.status === "created";
//   const [orderStatus, setOrderStatus] = useState("Processing");
//   const { id: orderId } = useParams();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const orderData = { orderStatus };
//     dispatch(updateSellerOrder(orderId, orderData));
//   };

//   useEffect(() => {
//     if (isOrderUpdated) {
//       toast.success("Order Updated Successfully", {
//         position: "bottom-center",
//       });
//       dispatch(clearOrderUpdated());
//       navigate("/vendor/orders");
//     } else if (error) {
//       toast.error(error, { position: "bottom-center" });
//       dispatch(clearError());
//     } else {
//       dispatch(orderSellerDetailAction(orderId));
//     }
//   }, [isOrderUpdated, error, dispatch, orderId]);

//   useEffect(() => {
//     if (orderSellerDetail._id) {
//       setOrderStatus(orderSellerDetail.orderStatus);
//     }

//     if orderSellerDetail.orderItems.map()
//   }, [orderSellerDetail]);

//   return (
//     <div className="row">
//       <div className="col-12 col-md-2">
//         <Sidebar />
//       </div>
//       <div className="col-12 col-md-10">
//         <Fragment>
//           <div className="row d-flex justify-content-around">
//             <div className="col-12 col-lg-8 mt-5 order-details">
//               <h1 className="my-5">Order # {orderSellerDetail.orderUId}</h1>

//               <h4 className="mb-4">Shipping Info</h4>
//               <p>
//                 <b>Name:</b> {shippingInfo.ordererName}
//               </p>
//               <p>
//                 <b>Phone:</b> {shippingInfo.phoneNo}
//               </p>
//               <p className="mb-4">
//                 <b>Address:</b>
//                 {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}
//               </p>
//               <p>
//                 <b>Amount:</b> &#8377;{grandTotal}
//               </p>

//               <hr />

//               <h4 className="my-4">Payment</h4>
//               <p className={isPaid ? "greenColor" : "redColor"}>
//                 <b>{isPaid ? "PAID" : "NOT PAID"}</b>
//               </p>

//               <h4 className="my-4">Order Status:</h4>
//               <p
//                 className={
//                   orderStatus?.includes("Delivered") ? "greenColor" : "redColor"
//                 }
//               >
//                 <b>{orderStatus}</b>
//               </p>

//               <h4 className="my-4">Order Items:</h4>
//               <hr />
//               <div className="cart-item my-1">
//                 {orderItems.map((item, index) => (
//                   <div className="row my-5" key={item.product || index}>
//                     <div className="col-4 col-lg-2">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         height="45"
//                         width="65"
//                       />
//                     </div>
//                     <div className="col-5 col-lg-5">
//                       <Link to={`/product/${item.product}`}>{item.name}&nbsp;ID:{item.productUId}</Link>
//                     </div>
//                     <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                       <p>&#8377;{item.baseSellerPrice}</p>
//                     </div>
//                     <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                       <p>{item.quantity} Piece(s)</p>
//                     </div>
//                     <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                       <p>Size :{item.selSizes}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <hr />
//             </div>
//             <div className="col-12 col-lg-3 mt-5">
//               <h4 className="my-4">Order Status</h4>
//               <div className="form-group">
//                 <select
//                   className="form-control"
//                   onChange={(e) => setOrderStatus(e.target.value)}
//                   value={orderStatus}
//                   name="status"
//                 >
//                   <option value="Processing">Processing</option>
//                   <option value="Packing">Packing</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </div>
//               <button
//                 disabled={loading}
//                 onClick={submitHandler}
//                 className="btn btn-primary btn-block"
//               >
//                 Update Status
//               </button>
//             </div>
//           </div>
//         </Fragment>
//       </div>
//     </div>
//   );
// }
