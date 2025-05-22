import { useEffect, useState } from "react";
import {
  clearAuthError,
  updatePassword as updatePasswordAction,
} from "../../actions/userActions";
import { clearUpdatePasswrd } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../compcss/UpdatePassword.css";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);

    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast("Password updated successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearUpdatePasswrd());
        },
      });
      setOldPassword("");
      setPassword("");
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
  }, [isUpdated, error, dispatch]);

  return (
    <div className="updatepassword-form-head">
      <MetaData title={`Update Password`} />
      <div className="updatepassword-form-inside">
        <form onSubmit={submitHandler} className="form-tag">
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bt-color">
            {loading ? "Loading...." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
