import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function SellerRoute({ children, isSeller }) {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.authState
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    if (isSeller === true && user.role !== "seller") {
      return <Navigate to="/" />;
    }
    return children;
  }

  if (loading) {
    return <Loader />;
  }
}
