import React from "react";
import { Link } from "react-router-dom";
import "../compcss/ReturnUser.css";

export default function ReturnUser() {
  const togglet = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <div className="return-head">
      <div className="return-first-part">
        <h2>Return Policy for Klaaton.com</h2>
        <h5>
          <b>Effective Date:</b> February 1, 2025
        </h5>
        <p>
          At Klaaton.com, we want you to be completely satisfied with your
          purchase. If you are not satisfied with your order, we offer a
          hassle-free return process, subject to the following terms and
          conditions.
        </p>
      </div>
      <div className="return-second-part">
        <h4>1. Eligibility for Returns</h4>
        <ul>
          <li>
            You can return items within <b>2</b> days from the date of delivery.
          </li>
          <li>
            Items must be in <b>original condition</b>, including the tags,
            packaging, and any included accessories.
          </li>
          <li>
            <b>Non-returnable items</b> include:
            <ul>
              <li>
                Items on sale or marked as non-returnable at the time of
                purchase.
              </li>
              <li>Personalized or custom-made products.</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="return-fourth-part">
        <h4>2. Return Process</h4>
        <ul>
          <li>
            To initiate a return, please contact us at{" "}
            <b>jcodeuniverse01@gmail.com</b> with the following information:
            <ul>
              <li>Order number</li>
              <li>Product(s) you wish to return</li>
              <li>Reason for the return</li>
            </ul>
          </li>
          <li>
            Once we approve your return request, we will send you a return
            authorization and instructions.
          </li>
        </ul>
      </div>

      <div className="return-fifth-part">
        <h4>3. Return Shipping</h4>
        <ul>
          <li>
            Customers are responsible for the return shipping costs unless the
            product was delivered damaged or incorrect.
          </li>
          <li>
            We recommend using a trackable shipping service or purchasing
            shipping insurance for returns, as we cannot guarantee we will
            receive the returned item.
          </li>
        </ul>
      </div>

      <div className="return-sixth-part">
        <h4>4. Refund Process</h4>
        <ul>
          <li>
            Once we receive and inspect the returned product, we will process
            your refund as per our&nbsp;
            <Link to="/policy/refund" onClick={togglet}>
              Refund Policy
            </Link>
            .
          </li>
          <li>
            Refunds will be issued to the original payment method used during
            the purchase.
          </li>
          <li>
            Processing time for refunds can take <b>5-10 business</b> days after
            receiving the returned product.
          </li>
        </ul>
      </div>

      <div className="return-seventh-part">
        <h4>5. Damaged or Incorrect Items</h4>
        <ul>
          <li>
            If you receive a damaged or incorrect item, please notify us within{" "}
            <b>48 hours</b> of delivery.
          </li>
          <li>
            We will provide a prepaid return label and issue a replacement or
            full refund for the damaged/incorrect item.
          </li>
        </ul>
      </div>

      <div className="return-eighth-part">
        <h4>6. Exchanges</h4>
        <ul>
          <li>
            We currently do not offer direct exchanges. If you need a different
            size, color, or item, please return the original product and place a
            new order for the replacement.
          </li>
        </ul>
      </div>

      <div className="return-ninth-part">
        <h4>7. Exceptions</h4>
        <ul>
          <li>
            If an item is returned in a damaged or used condition, or if it does
            not meet the eligibility requirements, we may refuse the return or
            offer a partial refund.
          </li>
          <li>
            Refunds will not be processed if the return does not follow the
            guidelines outlined in this policy.
          </li>
        </ul>
      </div>

      <div className="return-ninth-part">
        <h4>8. Contact Us</h4>
        <p>
          For any questions or assistance with your return, please contact us
          at: <b>jcodeuniverse01@gmail.com</b>
        </p>
      </div>

      <div className="return-fourteenth-part">
        By purchasing from <b>www.klaaton.com</b>, you agree to these&nbsp;
        <b>Return Policy</b> terms and conditions.
      </div>
    </div>
  );
}
