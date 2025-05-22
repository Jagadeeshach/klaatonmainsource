import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);

  return (
    <div className="row justify-content-around mt-5 user-info">
      <div className="col-12 col-md-5">
        <h4>Full Name</h4>
        <p>{user.name}</p>

        <h4>Email Address</h4>
        <p>{user.email}</p>

        <h4>Joined</h4>
        <p>{new Date(user.createdAt).toLocaleDateString("en-IN")}</p>

        <Link to="/orders" className="btn btn-danger btn-block mt-5">
          My Orders
        </Link>

        <Link
          to="/myprofile/update/password"
          className="btn btn-primary btn-block mt-3"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
