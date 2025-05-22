import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteOrder,
  adminOrders as fetchAdminOrders,
} from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Button, Pagination } from "react-bootstrap";

export default function OrderList() {
  const dispatch = useDispatch();
  const {
    adminOrders = [],
    loading,
    error,
    isOrderDeleted,
    totalPages,
    currentPage,
  } = useSelector((state) => state.orderState);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAdminOrders(page)); // Fetch orders for current page
  }, [dispatch, page, isOrderDeleted]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isOrderDeleted) {
      toast.success("Order Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
    }
  }, [dispatch, error, isOrderDeleted]);

  const setOrders = () => {
    return {
      columns: [
        { label: "Order ID", field: "id", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Seller", field: "sellerNames", sort: "asc" },
        { label: "C Date", field: "creationdate", sort: "asc" },
        { label: "Coupon", field: "couponcode", sort: "asc" },
        { label: "Seller Email", field: "sellerEmails", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: adminOrders.map((order) => ({
        id: order.orderUId,
        couponcode: order.discountDetails.discountCouponCode,
        creationdate: new Date(order.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        sellerNames: order.orderItems.map((item) => item.sellerId?.name || "N/A").join(", "),
        sellerEmails: order.orderItems.map((item) => item.sellerId?.email || "N/A").join(", "),
        amount: (
          <p>
            &#8377; {typeof order.discountDetails?.finalAmountAfterDiscount === "number" &&
            !isNaN(order.discountDetails.finalAmountAfterDiscount) &&
            order.discountDetails.finalAmountAfterDiscount !== 0
              ? order.discountDetails.finalAmountAfterDiscount
              : order.totalPrice}
          </p>
        ),
        status: (
          <p
            style={{
             color: order.orderItems.some(item => item.orderStatus === "Processing")
             ? "red"
             : order.orderItems.some(item => item.orderStatus === "Cancel")
             ? "orange"
             : order.orderItems.some(item => item.orderStatus === "Return")
             ? "#00FFFF"
             : order.orderItems.some(item => item.orderStatus === "Delivered") 
             ? "green"
             : "blue"
            }}
          >
            {order.orderItems.map(item => item.orderStatus || "N/A").join(", ")}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, order._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      })),
    };
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteOrder(id));
  };

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Order List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable data={setOrders()} bordered striped hover className="px-3" />
              <Pagination className="mt-3">
                {[...Array(totalPages).keys()].map((num) => (
                  <Pagination.Item
                    key={num + 1}
                    active={num + 1 === page}
                    onClick={() => setPage(num + 1)}
                    style={{ cursor: "pointer" }}
                  >
                    {num + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
        </Fragment>
      </div>
    </div>
  );
}


// import { Fragment, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   deleteOrder,
//   adminOrders as adminOrdersAction,
// } from "../../actions/orderActions";
// import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
// import Loader from "../layouts/Loader";
// import { MDBDataTable } from "mdbreact";
// import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";

// export default function OrderList() {
//   const {
//     adminOrders = [],
//     loading = true,
//     error,
//     isOrderDeleted,
//   } = useSelector((state) => state.orderState);

//   const dispatch = useDispatch();

//   const setOrders = () => {
//     const data = {
//       columns: [
//         {
//           label: "ID",
//           field: "id",
//           sort: "asc",
//         },
//         {
//           label: "Amount",
//           field: "amount",
//           sort: "asc",
//         },
//         {
//           label: "Seller",
//           field: "sellerNames",
//           sort: "asc",
//         },
//         {
//           label: "C Date",
//           field: "creationdate",
//           sort: "asc",
//         },
//         {
//           label: "Coupon",
//           field: "couponcode",
//           sort: "asc",
//         },
//         {
//           label: "Seller Email",
//           field: "sellerEmails",
//           sort: "asc",
//         },
//         {
//           label: "Status",
//           field: "status",
//           sort: "asc",
//         },
//         {
//           label: "Actions",
//           field: "actions",
//           sort: "asc",
//         },
//       ],
//       rows: [],
//     };
//     adminOrders.forEach((order) => {
//       data.rows.push({
//         id: order.orderUId,
//         // noOfItems: order.orderItems.length,
//         couponcode: order.discountDetails.discountCouponCode,
//         // creationdate: order.createdAt,
//         creationdate: new Date(order.createdAt).toLocaleString("en-US", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: true, 
//         }),
//         sellerNames: order.orderItems.map((item) => item.sellerId?.name || "N/A").join(", "),
//         sellerEmails: order.orderItems.map((item) => item.sellerId?.email || "N/A").join(", "),
//         amount: <p>&#8377; {order.totalPrice}</p>,
//         status: (
//           <p
//             style={{
//               color: order.orderStatus.includes("Processing") ? "red" : "green",
//             }}
//           >
//             {order.orderStatus}
//           </p>
//         ),
//         actions: (
//           <Fragment>
//             <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
//               <i className="fa fa-pencil"></i>
//             </Link>
//             <Button
//               onClick={(e) => deleteHandler(e, order._id)}
//               className="btn btn-danger py-1 px-2 ml-2"
//             >
//               <i className="fa fa-trash"></i>
//             </Button>
//           </Fragment>
//         ),
//       });
//     });
//     return data;
//   };

//   const deleteHandler = (e, id) => {
//     e.preventDefault();
//     e.target.disabled = true;
//     dispatch(deleteOrder(id));
//   };

//   useEffect(() => {
//     if (error) {
//       toast(error, {
//         position: "bottom-center",
//         type: "error",
//         onOpen: () => {
//           dispatch(clearError());
//         },
//       });
//       return;
//     }

//     if (isOrderDeleted) {
//       toast("Order Deleted Successfully", {
//         position: "bottom-center",
//         type: "success",
//         onOpen: () => {
//           dispatch(clearOrderDeleted());
//         },
//       });
//       return;
//     }

//     dispatch(adminOrdersAction);
//   }, [dispatch, error, isOrderDeleted]);

//   return (
//     <div className="row">
//       <div className="col-12 col-md-2">
//         <Sidebar />
//       </div>
//       <div className="col-12 col-md-10">
//         <h1 className="my-4">Order List</h1>
//         <Fragment>
//           {loading ? (
//             <Loader />
//           ) : (
//             <MDBDataTable
//               data={setOrders()}
//               bordered
//               striped
//               hover
//               className="px-3"
//             />
//           )}
//         </Fragment>
//       </div>
//     </div>
//   );
// }
