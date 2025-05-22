import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, forgotPassword } from "../../actions/userActions";
import { toast } from "react-toastify";
import "../compcss/ForgotPass.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast(message, { type: "success", position: "bottom-center" });
      setEmail("");
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
  }, [message, error, dispatch]);

  return (
    <div className="forgot-form-head">
      <div className="forgot-form-inside">
        <form onSubmit={submitHandler} className="form-rest">
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="bt-color"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
