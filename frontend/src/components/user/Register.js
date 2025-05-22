import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { register, clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../compcss/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading = false, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
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
    <div className="register-form-head">
      <MetaData title={`Register`} />
      <div className="register-form-inside">
        <form
          onSubmit={submitHandler}
          className="form-tag"
          encType="multipart/form-data"
        >
          <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input
              type="name"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button
            id="register_button"
            type="submit"
            className="bt-color"
            disabled={loading}
          >
           {loading ? "Creating...." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
  );
}
