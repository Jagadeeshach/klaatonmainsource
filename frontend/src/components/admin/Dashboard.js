import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/userActions";
import { getAllAdminOrderAndProData } from "../../actions/orderActions";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const { adminProdOrdersData = {}, loading = false, } = useSelector((state) => state.orderState);
  const { productCount = 0, outOfStockCount = 0, totalOrderAmount = 0, totalOrders = 0 } = adminProdOrdersData;
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers);
    dispatch(getAllAdminOrderAndProData);
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Dashboard</h1>
        <div className="row pr-4">
          <div className="col-xl-12 col-sm-12 mb-3">
            <div className="card text-white bg-primary o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Total Amount
                  <br />{ loading ? "Loading...." :<b>&#8377; {totalOrderAmount}</b>}
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
                  <br />{ loading ? "Loading...." : <b>{productCount}</b>}
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/products"
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
                  <br />{ loading ? "Loading...." :<b>{totalOrders}</b>}
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/orders"
              >
                <span className="float-left">View Details</span>
                <span className="float-right">
                  <i className="fa fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white bg-info o-hidden h-100">
              <div className="card-body">
                <div className="text-center card-font-size">
                  Users
                  <br /> <b>{users.length}</b>
                </div>
              </div>
              <Link
                className="card-footer text-white clearfix small z-1"
                to="/admin/users"
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
                  <br />{ loading ? "Loading...." :<b>{outOfStockCount}</b>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
