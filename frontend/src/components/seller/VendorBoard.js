import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellerOrderAndProData } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import Sidebr from "./Sidebr";

export default function VendorBoard() {
  const {loading = false, sellerProdOrdersData = {} } = useSelector((state) => state.orderState);
  const { totalSellerProducts = 0, totalSellerOutOfStock = 0, totalSellerOrderAmount = 0, totalSellerOrders = 0} = sellerProdOrdersData;
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAllSellerOrderAndProData)
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
         <Sidebr />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br /> {loading ? "Loading....": <b>&#8377; {totalSellerOrderAmount}</b>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pr-4">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-success o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Products
                  <br /> {loading ? "Loading....": <b>{totalSellerProducts}</b>}
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/vendor/products"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-danger o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Orders
                  <br /> {loading ? "Loading....": <b>{totalSellerOrders}</b>}
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/vendor/orders"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-warning o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Out of Stock
                  <br /> {loading ? "Loading....": <b>{totalSellerOutOfStock}</b>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
