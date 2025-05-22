import { Fragment } from "react";
import "../../App.css";

export default function OrderSteps({ status }) {
  

  return (
    <Fragment>
      {/* <div className="step-main-div"> */}
      <div
       className="step-main-div"
       style={{
        backgroundColor:
        status === "Cancel"
        ? "red"
        : status === "Return"
        ? "#BF00FF"
        : "#232f3e"
        }}
      >
        <div className="comm-div">
          <div
            className="step-circle-div"
            style={{
              backgroundColor:
                status === "Processing" ||
                status === "Shipped" ||
                status === "Delivered" ||
                status === "Packing"
                  ? "#1cd8f9"
                  : "white",
            }}
          ></div>
          <p>Processing</p>
        </div>

        <div
          className="mid-line-div"
          style={{
            borderColor:
              status === "Shipped" ||
              status === "Delivered" ||
              status === "Packing"
                ? "#1cd8f9"
                : "white",
          }}
        />

        <div className="comm-div">
          <div
            className="step-circle-div"
            style={{
              backgroundColor:
                status === "Packing" ||
                status === "Shipped" ||
                status === "Delivered"
                  ? "#1cd8f9"
                  : "white",
            }}
          ></div>
          <p>Packing</p>
        </div>

        <div
          className="mid-line-div"
          style={{
            borderColor:
              status === "Shipped" || status === "Delivered"
                ? "#1cd8f9"
                : "white",
          }}
        />

        <div className="comm-div">
          <div
            className="step-circle-div"
            style={{
              backgroundColor:
                status === "Shipped" || status === "Delivered"
                  ? "#1cd8f9"
                  : "white",
            }}
          ></div>
          <p>Shipping</p>
        </div>

        <div
          className="mid-line-div"
          style={{
            borderColor: status === "Delivered" ? "#1cd8f9" : "white",
          }}
        />

        <div className="comm-div">
          <div
            className="step-circle-div"
            style={{
              backgroundColor: status === "Delivered" ? "#1cd8f9" : "white",
            }}
          ></div>
          <p>Delivered</p>
        </div>
      </div>
    </Fragment>
  );
}
