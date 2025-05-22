import React from "react";
import { Link } from "react-router-dom";
import "../compcss/TermsUser.css";

export default function TermsUser() {
  const togglet = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <div className="terms-head">
      <div className="terms-first-part">
        <h2>Terms and Conditions for Klaaton.com</h2>
        <h5>
          <b>Effective Date:</b> February 1, 2025
        </h5>
        <p>
          Welcome to Klaaton.com ("we," "our," or "us"). By accessing and using
          our website, you agree to comply with and be bound by the following
          Terms and Conditions. If you do not agree, please do not use our
          services.
        </p>
      </div>
      <div className="terms-second-part">
        <h4>1. General Terms</h4>
        <ul>
          <li>
            These Terms and Conditions govern your use of&nbsp;
            <b>Klaaton.com</b> and any related services, including purchases of
            fashion products such as clothing, shoes, and accessories.
          </li>
          <li>
            We reserve the right to modify these terms at any time. Changes will
            be effective upon posting on this page.
          </li>
        </ul>
      </div>
      <div className="terms-fourth-part">
        <h4>2. User Accounts</h4>
        <ul>
          <li>
            You must provide accurate and complete information when creating an
            account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>
            Passwords are <b>encrypted</b>, and we cannot read or access them.
          </li>
          <li>
            We reserve the right to suspend or terminate accounts for fraudulent
            activities or violation of these terms.
          </li>
        </ul>
      </div>

      <div className="terms-fifth-part">
        <h4>3. Orders and Payments</h4>
        <ul>
          <li>
            By placing an order, you agree that all information provided is
            accurate.
          </li>
          <li>
            Prices are listed in <b>INR</b>, and we reserve the right to modify
            them at any time.
          </li>
          <li>
            We accept payments via secure third-party payment gateways. We
            do&nbsp;
            <b>not</b> store credit/debit card details.
          </li>
          <li>
            Orders may be canceled or refunded in accordance with our&nbsp;
            <Link to="/policy/refund" onClick={togglet}>
              Refund Policy
            </Link>
            .
          </li>
        </ul>
      </div>

      <div className="terms-sixth-part">
        <h4>4. Shipping and Delivery</h4>
        <ul>
          <li>
            We process and ship orders within the estimated time provided on our
            website.
          </li>
          <li>
            Delays caused by shipping carriers or unforeseen events are not our
            responsibility.
          </li>
          <li>
            Customers must provide a correct shipping address. We are not
            responsible for lost shipments due to incorrect details.
          </li>
        </ul>
      </div>

      <div className="terms-seventh-part">
        <h4>5. Returns and Refunds</h4>
        <ul>
          <li>
            Returns and refunds are subject to our&nbsp;
            <Link to="/policy/return" onClick={togglet}>
              Return Policy
            </Link>
            , which outlines eligibility and timelines.
          </li>
          <li>
            Items must be returned in original condition with tags and packaging
            intact.
          </li>
          <li>
            Refunds will be processed back to the original payment method.
          </li>
        </ul>
      </div>

      <div className="terms-eighth-part">
        <h4>6. Intellectual Property</h4>
        <ul>
          <li>
            All website content, including text, images, logos, and product
            designs, is the property of <b>Klaaton.com</b> and may&nbsp;
            <b>not</b> be copied, distributed, or used without permission.
          </li>
          <li>
            Unauthorized use of our intellectual property may result in legal
            action.
          </li>
        </ul>
      </div>

      <div className="terms-ninth-part">
        <h4>7. Prohibited Activities</h4>
        <p>
          You agree <b>not</b> to:
        </p>
        <ul>
          <li>Use our website for fraudulent or unlawful purposes.</li>
          <li>Attempt to hack, disrupt, or interfere with our services.</li>
          <li>
            Copy, resell, or exploit our products or website content without
            authorization.
          </li>
          <li>Submit false reviews, spam, or misleading information.</li>
        </ul>
      </div>

      <div className="terms-ninth-part">
        <h4>8. Limitation of Liability</h4>
        <ul>
          <li>
            We strive to provide accurate product descriptions and services, but
            we do <b>not</b> guarantee uninterrupted access to our website.
          </li>
          <li>
            We are <b>not</b> liable for any indirect, incidental, or
            consequential damages arising from your use of our website or
            products.
          </li>
        </ul>
      </div>

      <div className="terms-eleventh-part">
        <h4>9. Privacy Policy</h4>
        <ul>
          <li>
            Your use of our website is also governed by our&nbsp;
            <Link to="/policy/privacy" onClick={togglet}>
              Privacy Policy
            </Link>
            , which details how we collect, store, and protect your data.
          </li>
        </ul>
      </div>

      <div className="terms-twelveth-part">
        <h4>10. Governing Law</h4>
        <ul>
          <li>
            These Terms and Conditions are governed by the laws of India..
          </li>
          <li>
            Any disputes shall be resolved through arbitration or the relevant
            courts in Bangalore.
          </li>
        </ul>
      </div>

      <div className="terms-thirteenth-part">
        <h4>11. Contact Us</h4>
        <p>
          If you have any questions about these Terms and Conditions, please
          contact us at: <b>jcodeuniverse01@gmail.com</b>
        </p>
      </div>

      <div className="terms-fourteenth-part">
        By using <b>www.klaaton.com</b>, you agree to these Terms and
        Conditions.
      </div>
    </div>
  );
}
