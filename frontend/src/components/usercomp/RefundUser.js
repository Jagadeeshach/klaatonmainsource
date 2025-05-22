import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../compcss/RefundUser.css";

export default function RefundUser() {
  // const navigate = useNavigate();

  // function ScrollToTop() {
  //   const { pathname } = useLocation();

  //   useEffect(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, [pathname]); // Runs when pathname changes

  //   return null;
  // }

  const togglet = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <div className="refund-head">
      <div className="refund-first-part">
        <h2>Refund Policy for Klaaton.com</h2>
        <h5>
          <b>Effective Date:</b> February 1, 2025
        </h5>
        <p>
          At Klaaton.com, we are committed to providing you with a satisfactory
          shopping experience. If you are not happy with your purchase, our{" "}
          <b>Refund Policy</b> ensures you are taken care of.
        </p>
      </div>
      <div className="refund-second-part">
        <h4>1. Eligibility for Refunds</h4>
        <p>Refunds are applicable under the following circumstances: </p>
        <ul>
          <li>
            The item is <b>damaged</b> or <b>defective</b> upon delivery.
          </li>
          <li>
            The item is <b>incorrectly shipped</b> (e.g., wrong size, color, or
            product).
          </li>
          <li>
            The item is returned within <b>2 days</b> from the date of delivery
            and is in <b>original condition</b> with tags and packaging intact.
          </li>
        </ul>
      </div>
      <div className="refund-fourth-part">
        <h4>2. Process for Requesting a Refund</h4>
        <ul>
          <li>
            To request a refund, please contact us at&nbsp;
            <b>jcodeuniverse01@gmail.com</b> with the following details:
            <ul>
              <li>Order number</li>
              <li>Product(s) for refund</li>
              <li>
                Reason for the refund request (e.g., damaged, defective, wrong
                product)
              </li>
            </ul>
          </li>
          <li>
            After we receive your request, we will provide you with return
            instructions (if applicable).
          </li>
        </ul>
      </div>

      <div className="refund-fifth-part">
        <h4>3. Refunds for Returns</h4>
        <ul>
          <li>
            Once your returned item is received and inspected, we will process
            your refund.
          </li>
          <li>
            Refunds will be issued to the <b>original payment method</b> used
            during the purchase.
          </li>
          <li>
            The time it takes for your refund to appear in your account depends
            on your bank or payment provider, but typically it can take&nbsp;
            <b>5-10 business days</b> after the return has been processed.
          </li>
        </ul>
      </div>

      <div className="refund-sixth-part">
        <h4>4. Refund for Damaged or Incorrect Items</h4>
        <ul>
          <li>
            If your item arrives damaged or is incorrect, please inform us
            within <b>48 hours</b> of receiving the product..
          </li>
          <li>
            We will issue a full <b>refund</b> or <b>replacement</b> depending
            on the situation.
          </li>
        </ul>
      </div>

      <div className="refund-seventh-part">
        <h4>5. Non-Refundable Situations</h4>
        <p>The following circumstances are not eligible for refunds:</p>
        <ul>
          <li>
            <b>Non-returnable products</b> such as custom-made or personalized
            items.
          </li>
          <li>
            If you do not follow the guidelines mentioned in the&nbsp;
            <Link to="/policy/return" onclick={togglet}>
              Return Policy
            </Link>
            .
          </li>
        </ul>
      </div>

      <div className="refund-eighth-part">
        <h4>6. Processing Time</h4>
        <ul>
          <li>
            Refunds are typically processed within <b>7 business days</b> once
            we confirm the eligibility of the return or the reason for the
            refund.
          </li>
          <li>
            Refunds will be processed using the same payment method used for the
            original purchase.
          </li>
        </ul>
      </div>

      <div className="refund-ninth-part">
        <h4>7. Contact Us</h4>
        <ul>
          <li>
            If you have any questions about our Refund Policy or need
            assistance, feel free to contact us at:&nbsp;
            <b>jcodeuniverse01@gmail.com</b>
          </li>
        </ul>
      </div>

      <div className="refund-fourteenth-part">
        By making a purchase at <b>www.klaaton.com</b>, you agree to our&nbsp;
        <b>Refund Policy</b>.
      </div>
    </div>
  );
}
