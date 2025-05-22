import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAuthError, login } from "../../actions/userActions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../compcss/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading = false, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      //navigate("/order/success");
      // navigate("/shipping");
      navigate("/cart");
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title={`Log in`} />
      <div className="login-form-head">
        <div className="login-form-inside">
          <form onSubmit={submitHandler} className="form-login-tag">
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* to="/password/forgot" */}
            <Link to="#" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="bt-color"
              disabled={loading}
            >
              {loading ? "Loading...." : "LOGIN"}
            </button>

            <Link to="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
