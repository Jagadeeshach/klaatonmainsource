import { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import "../compcss/ShippingInfo.css";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.ordererName ||
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
      position: "bottom-center",
    });
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const [ordererName, setOrdererName] = useState(shippingInfo.ordererName);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  // const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastShown = useRef(false);

  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({
        ordererName,
        address,
        city,
        phoneNo,
        postalCode,
        country,
        state,
      })
    );
    navigate("/order/confirm");
    //navigate("/shipping");
  };

  useEffect(() => {
    if (!toastShown.current) {
      toast.info("Currently, our services are only available in Bangalore!", {
        position: "bottom-center",
        autoClose: 10000,
      });
      toastShown.current = true;
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
    };

    if (inputRef.current) {
        inputRef.current.addEventListener("wheel", handleWheel);
        inputRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
        if (inputRef.current) {
            inputRef.current.removeEventListener("wheel", handleWheel);
            inputRef.current.removeEventListener("keydown", handleKeyDown);
        }
    };
  }, []);
  

  return (
    <Fragment>
      <CheckoutSteps shipping />
      <div className="shipping-form-head">
        <div className="shipping-form-inside">
          <form onSubmit={submitHandler} className="form-shipping-tag">
            <h1 className="mb-4">Shipping Info</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={ordererName}
                onChange={(e) => setOrdererName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                ref={inputRef}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state_field">State</label>
              <input
                type="text"
                id="state_field"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="form-group slt">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            

            <button
              id="shipping_btn"
              type="submit"
              className="bt-color"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
