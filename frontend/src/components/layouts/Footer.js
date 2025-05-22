import React from "react";
import { Link } from "react-router-dom";
import "../compcss/Footer.css";

export default function Footer() {
  const togglef = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <footer className="footer-main">
      <div className="footer-first-box">
        <p>Klaaton.com - 2024-2025.&nbsp;</p>
        <p>All Rights Reserved.</p>
      </div>

      <div className="footer-second-head">
        <ul className="footer-details-box">
          <Link to="/" onClick={togglef}>
            Home
          </Link>
          <Link to="/read/about" onClick={togglef}>
            About us
          </Link>
          <Link to="/read/partnership" onClick={togglef}>
            Partnerships
          </Link>
          <Link to="/read/contact" onClick={togglef}>
            Contact Us
          </Link>
        </ul>
        <ul className="footer-details-second-box">
          <Link to="/policy/privacy" onClick={togglef}>
            Privacy Policy
          </Link>
          <Link to="/policy/terms" onClick={togglef}>
            Terms and Conditions
          </Link>
          <Link to="/policy/return" onClick={togglef}>
            Return Policy
          </Link>
          <Link to="/policy/refund" onClick={togglef}>
            Refund Policy
          </Link>
        </ul>
      </div>
    </footer>
  );
}
