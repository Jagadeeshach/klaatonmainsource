import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/vendor/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>

          <li>
            <NavDropdown title={<i className="fa fa-product-hunt"> Product</i>}>
              <NavDropdown.Item onClick={() => navigate("/vendor/products")}>
                <i className="fa fa-shopping-basket"> All</i>
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => navigate("/vendor/products/create")}
              >
                <i className="fa fa-plus"> Create</i>
              </NavDropdown.Item>
            </NavDropdown>
          </li>

          <li>
            <Link to="/vendor/orders">
              <i className="fa fa-shopping-basket"></i> Orders
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
