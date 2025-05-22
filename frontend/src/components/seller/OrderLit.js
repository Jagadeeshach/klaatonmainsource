import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sellerOrders as sellerOrdersAction } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebr";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function OrderLit() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    sellerOrders = [],
    totalOrders = 0,
    totalPages = 1,
    loading = true,
    error,
  } = useSelector((state) => state.orderState);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    dispatch(sellerOrdersAction(currentPage));
  }, [dispatch, error, currentPage]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Order ID", field: "id", sort: "asc" },
        { label: "Number of Items", field: "noOfItems", sort: "asc" },
        { label: "Date", field: "creationDate", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    sellerOrders.forEach((order) => {
      data.rows.push({
        id: order.orderUId,
        noOfItems: order.orderItems.length,
        creationDate: new Date(order.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        amount: <p>&#8377; {order.totalPrice}</p>,
        status: (
          // <p style={{ color: order.orderStatus?.includes("Processing") ? "red" : "green" }}>
          <p
            style={{
            color: order.orderStatus?.includes("Processing")
            ? "red"
            : order.orderStatus?.includes("Cancel")
            ? "orange"
            : order.orderStatus?.includes("Return")
            ? "#00FFFF"
            : order.orderStatus?.includes("Delivered")
            ? "green"
            : "blue"
            }}
          >
            {order.orderStatus || "Unknown"}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/vendor/order/${order._id}`} className="btn btn-primary me-2">
              <i className="fa fa-pencil"></i>
            </Link>
          </Fragment>
        ),
      });
    });

    return data;
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
              <div className="pagination mt-3">
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <span className="mx-3">Page {currentPage} of {totalPages}</span>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
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
//   deleteSellerOrder,
//   sellerOrders as sellerOrdersAction,
// } from "../../actions/orderActions";
// import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
// import Loader from "../layouts/Loader";
// import { MDBDataTable } from "mdbreact";
// import Sidebar from "./Sidebr";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";

// export default function OrderList() {
//   const {
//     sellerOrders = [],
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
//           label: "Number of Items",
//           field: "noOfItems",
//           sort: "asc",
//         },
//         {
//           label: "Date",
//           field: "creationdate",
//           sort: "asc",
//         },
//         {
//           label: "Amount",
//           field: "amount",
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
//     sellerOrders.forEach((order) => {
//       data.rows.push({
//         id: order.orderUId,
//         noOfItems: order.orderItems.length,
//         creationdate: new Date(order.createdAt).toLocaleString("en-US", {
//           year: "numeric",
//           month: "2-digit",
//           day: "2-digit",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: true, 
//         }),
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
//             <Link to={`/vendor/order/${order._id}`} className="btn btn-primary">
//               <i className="fa fa-pencil"></i>
//             </Link>
//           </Fragment>
//         ),
//       });
//     });
//     return data;
//   };

//   const deleteHandler = (e, id) => {
//     e.preventDefault();
//     e.target.disabled = true;
//     dispatch(deleteSellerOrder(id));
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

//     dispatch(sellerOrdersAction);
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
