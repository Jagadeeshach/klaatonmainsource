import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MetaData from "../layouts/MetaData";
import { validateShipping } from "./Shipping";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder, getSingleDiscount } from "../../actions/orderActions";
import { clearError as clearOrderError, clearSellerOrderDetails, clearDiscountData } from "../../slices/orderSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ConfirmOrder() {
  const [couponWord, setCouponWord] = useState("");
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const { error: orderError, isDiscountData={}, loading } = useSelector((state) => state.orderState);
  const {
    finalAmountAfterDiscount = null, 
    discountAmountAvailable = 0, 
    amount = 0, 
    couponCode = "", 
    discountPercent = "",
  } = isDiscountData || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const actualItemsPrice = cartItems.reduce(
    (acc, item)=> acc + item.actualPrice * item.quantity,
    0
  )
  const baseSellerPriceTotal = cartItems.reduce(
    (acc, item)=> acc + item.baseSellerPrice * item.quantity,
    0
  )

  const baseSellerPriceTotalRounded = Math.round(baseSellerPriceTotal);
  const savedActual = Math.round(actualItemsPrice - itemsPrice);

  const totalPrice = Math.round(itemsPrice); 
  const [firstAmnt, setFirstAmnt] = useState(totalPrice);

  const discountDetails = {
    finalAmountAfterDiscount: finalAmountAfterDiscount,
    discountAmount: discountAmountAvailable,
    enteredAmount: amount,
    discountCouponCode: couponCode,
    discountPercent: discountPercent,
  }

  const order = {
    orderItems: cartItems,
    itemsPrice,
    totalPrice,
    actualItemsPrice,
    baseSellerPriceTotalRounded,
    shippingInfo,
    discountDetails,
  };

  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the backend
      const { data: orderResponse } = await axios.post("/api/v1/create-order", {
        amount: firstAmnt,
        currency: "INR",
      });

      if (!orderResponse.success) {
        toast("Failed to create order. Please try again.", {
          type: "error",
          position: "bottom-center",
        });
        return;
      }

      // Step 2: Fetch Razorpay key from the backend
      const { data: keyResponse } = await axios.get("/api/v1/processkey");
      const razorpayKey = keyResponse.key;

      // Step 3: Initialize Razorpay payment
      const options = {
        key: razorpayKey, // Use Razorpay key from backend
        amount: orderResponse.order.amount, // Amount in paise
        currency: orderResponse.order.currency,
        name: "JCodeUniverse",
        description: cartItems.name,
        order_id: orderResponse.order.id, // Order ID from backend
        handler: async function (response) {
          // Step 4: Verify payment on the backend
          const { data: verifyResponse } = await axios.post(
            "/api/v1/verify-payment",
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }
          );

          if (verifyResponse.success) {
            toast("Payment successful and verified!", {
              type: "success",
              position: "bottom-center",
            });
            order.paymentInfo = {
              id: response.razorpay_payment_id,
              status: orderResponse.order.status,
            };
            dispatch(orderCompleted());
            dispatch(createOrder(order));
            dispatch(clearSellerOrderDetails());
            dispatch(clearDiscountData());
            navigate("/order/success");
          } else {
            toast("Payment verification failed.", {
              type: "error",
              position: "bottom-center",
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to process payment. Please try again.");
    }
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    dispatch(clearDiscountData());

    
  }, []);

  useEffect(()=>{
    if (finalAmountAfterDiscount !== null && finalAmountAfterDiscount !== undefined) {
      setFirstAmnt(finalAmountAfterDiscount);
    } else {
      setFirstAmnt(totalPrice);
    }

    if (orderError) {
      toast(orderError, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }

    if (finalAmountAfterDiscount) {
      toast(`Your Rs.${discountAmountAvailable} is saved!`, {
        position: "bottom-center",
        type: "success",

        
      });
      return;
    }
  }, [finalAmountAfterDiscount, totalPrice, orderError]);

  

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      amount: totalPrice,
      couponCode: couponWord
    }
    
    dispatch(getSingleDiscount(formData));
    console.log(formData)
  };
  

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, PIN
            Code: {shippingInfo.postalCode}, {shippingInfo.state},
            {shippingInfo.country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map((item) => (
            <Fragment>
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <LazyLoadImage
                      src={item.image}
                      alt={item.name}
                      effect="blur"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <b>Size: {item.selSizes}</b>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x &#8377;{item.price} ={" "}
                      <b>&#8377;{item.quantity * item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr/>
            <p>
              Product(s) price:
              <span className="order-summary-values text-dark">&#8377;{actualItemsPrice}</span>
            </p>

            <p>
              Saved:
              <span className="order-summary-values text-primary">&#8377;{savedActual}</span>
            </p>
            <hr />
            <p>
              Subtotal:
              <span className="order-summary-values">&#8377;{itemsPrice}</span>
            </p>
            <p>
              Shipping:
              <span className="order-summary-values">
                Free
              </span>
            </p>
            <p>
              Total:
              <span className="order-summary-values">&#8377;{firstAmnt}</span>
            </p>

            <hr />
            <div className="apply-cpn-head">
              <label htmlFor="input_field">Apply Coupon Code</label>
              <div>
                <input
                  type="text"
                  id="input_field"
                  onChange={(e) => setCouponWord(e.target.value)}
                  className="apply-cpn-np-field"
                />
                <button disabled={!couponWord || loading} onClick={submitHandler} className="apply-cpn-btn">
                 {loading ? "Loading.." : "Apply"}
                </button>
              </div>
            </div>
            <button
              id="checkout_btn"
              onClick={handlePayment}
              className="btn btn-primary btn-block"
            >
              Pay {firstAmnt}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
