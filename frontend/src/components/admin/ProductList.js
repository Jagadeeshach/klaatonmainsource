import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAdminError } from "../../slices/productsSlice";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearProductDeleted } from "../../slices/productSlice";

export default function ProductList() {
  const [page, setPage] = useState(1);

  const { adminProds = [], loading, error, totalPages } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector((state) => state.productState);

  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
        { label: "Product ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price", field: "price", sort: "asc" },
        { label: "Stock", field: "stock", sort: "asc" },
        { label: "Seller", field: "sellername", sort: "asc" },
        { label: "Seller Email", field: "selleremail", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    adminProds.forEach((product) => {
      data.rows.push({
        id: product.productUId,
        name: product.name,
        price: <p>&#8377; {product.price}</p>,
        stock: product.stock,
        sellername: product.user.name,
        selleremail: product.user.email,
        actions: (
          <Fragment>
            <Link to={`/admin/product/${product._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button onClick={(e) => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAdminError());
        },
      });
      return;
    }

    if (isProductDeleted) {
      toast("Product Deleted Successfully", {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          dispatch(clearProductDeleted());
        },
      });
      return;
    }

    dispatch(getAdminProducts(page));
  }, [dispatch, error, isProductDeleted, page]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Product List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <>
              <MDBDataTable data={setProducts()} bordered striped hover className="px-3" />
              
              {/* Pagination Controls */}
              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Next
                </button>
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
// import { clearAdminError } from "../../slices/productsSlice";
// import { deleteProduct, getAdminProducts } from "../../actions/productActions";
// import Loader from "../layouts/Loader";
// import { MDBDataTable } from "mdbreact";
// import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { clearProductDeleted } from "../../slices/productSlice";

// export default function ProductList() {
//   const {
//     products = [],
//     loading = true,
//     error,
//   } = useSelector((state) => state.productsState);

//   const { isProductDeleted, error: productError } = useSelector(
//     (state) => state.productState
//   );

//   const dispatch = useDispatch();

//   const setProducts = () => {
//     const data = {
//       columns: [
//         {
//           label: "ID",
//           field: "id",
//           sort: "asc",
//         },
//         {
//           label: "Name",
//           field: "name",
//           sort: "asc",
//         },
//         {
//           label: "Price",
//           field: "price",
//           sort: "asc",
//         },
//         {
//           label: "Stock",
//           field: "stock",
//           sort: "asc",
//         },
//         {
//           label: "Seller",
//           field: "sellername",
//           sort: "asc",
//         },
//         {
//           label: "Seller Email",
//           field: "selleremail",
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
//     products.forEach((product) => {
//       data.rows.push({
//         id: product.productUId,
//         name: product.name,
//         price: <p>&#8377; {product.price}</p>,
//         stock: product.stock,
//         sellername: product.user.name,
//         selleremail: product.user.email,
//         actions: (
//           <Fragment>
//             <Link
//               to={`/admin/product/${product._id}`}
//               className="btn btn-primary"
//             >
//               <i className="fa fa-pencil"></i>
//             </Link>
//             <Button
//               onClick={(e) => deleteHandler(e, product._id)}
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
//     dispatch(deleteProduct(id));
//   };

//   useEffect(() => {
//     if (error || productError) {
//       toast(error || productError, {
//         position: "bottom-center",
//         type: "error",
//         onOpen: () => {
//           dispatch(clearAdminError());
//         },
//       });
//       return;
//     }

//     if (isProductDeleted) {
//       toast("Product Deleted Successfully", {
//         position: "bottom-center",
//         type: "success",
//         onOpen: () => {
//           dispatch(clearProductDeleted());
//         },
//       });
//       return;
//     }

//     dispatch(getAdminProducts);
//   }, [dispatch, error, isProductDeleted]);

//   return (
//     <div className="row">
//       <div className="col-12 col-md-2">
//         <Sidebar />
//       </div>
//       <div className="col-12 col-md-10">
//         <h1 className="my-4">Product List</h1>
//         <Fragment>
//           {loading ? (
//             <Loader />
//           ) : (
//             <MDBDataTable
//               data={setProducts()}
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
