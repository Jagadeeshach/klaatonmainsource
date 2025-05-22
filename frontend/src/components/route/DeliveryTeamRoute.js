import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function ProtectedRoute({ children, isDeliveryboy }) {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.authState
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated) {
    if ( isDeliveryboy === true && user.role !== "deliveryboy") {
      return <Navigate to="/" />;
    }
    return children;
  }

  if (loading) {
    return <Loader />;
  }
}
