import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/admin/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <NavDropdown title={<i className="fa fa-product-hunt"> Product</i>}>
              <NavDropdown.Item onClick={() => navigate("/admin/products")}>
                <i className="fa fa-shopping-basket"> All</i>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate("/admin/products/create")}
              >
                <i className="fa fa-plus"> Create</i>
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <NavDropdown title={<i className="fa fa-line-chart"> Ads</i>}>
              <NavDropdown.Item onClick={() => navigate("/admin/ads")}>
                <i className="fa fa-shopping-basket"> All Ads</i>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/admin/ads/create")}>
                <i className="fa fa-plus"> Create Ad</i>
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-users"></i> Reviews
            </Link>
          </li>

          <li>
            <NavDropdown title={<i class="fa fa-money" aria-hidden="true">&nbsp;&nbsp;Income and Tax</i>}>
              <NavDropdown.Item onClick={() => navigate("/admin/admincontrols")}>
                <i class="fa fa-calculator" aria-hidden="true">&nbsp;All</i>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate("/admin/admincontrols/new")}
              >
                <i className="fa fa-plus">&nbsp;Create</i>
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <NavDropdown title={
              <i class="fa fa-motorcycle" aria-hidden="true">&nbsp;&nbsp;Delivery Team</i>}>
              <NavDropdown.Item onClick={() => navigate("/admin/deliveryteam/list")}>
                <i class="fa fa-users" aria-hidden="true">&nbsp;All</i>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate("/admin/deliveryteam/create")}
              >
                <i class="fa fa-user-plus" aria-hidden="true">&nbsp;Create Referer</i>
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
}
