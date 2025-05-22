import React from "react";
import "../compcss/PrivacyUser.css";

export default function PrivacyUser() {
  const togglet = () => {
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <div className="privacy-head">
      <div className="privacy-first-part">
        <h2>Privacy Policy for Klaaton.com</h2>
        <h5>
          <b>Effective Date:</b> February 1, 2025
        </h5>
        <p>
          Klaaton.com ("we," "our," or "us") respects your privacy and is
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website and purchase our fashion products,
          including clothing, shoes, and accessories.
        </p>
      </div>
      <div className="privacy-second-part">
        <h4>1. Information We Collect</h4>
        <p>
          We collect various types of information to provide and improve our
          services, including:
        </p>
        <ul>
          <li>
            <b>Personal Information:</b>Name, email address, phone number,
            shipping and billing addresses, and payment details.
          </li>
          <li>
            <b>Account Information:</b>Username, encrypted password (we cannot
            read or access it), and purchase history if you create an account.
          </li>
          <li>
            <b>Payment Information:</b>We use third-party payment gateways to
            process payments securely. We do not store your credit/debit card
            details.
          </li>
          <li>
            <b>Browsing Information:</b>Pages visited, products searched or
            viewed, and time spent on our website.
          </li>
          <li>
            <b>Cookies and Tracking Technologies:</b>To enhance user experience,
            analyze trends, and for marketing purposes.
          </li>
        </ul>
      </div>
      <div className="privacy-third-part">
        <h4>2. How We Use Your Information</h4>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>To process and fulfill your orders.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>
            To send order confirmations, updates, and promotional offers (you
            can opt out anytime).
          </li>
          <li>
            To personalize your shopping experience by showing relevant
            products.
          </li>
          <li>To improve our website, services, and product offerings.</li>
          <li>
            To prevent fraud, unauthorized transactions, and enhance security.
          </li>
          <li>To comply with legal obligations and enforce our policies.</li>
        </ul>
      </div>
      <div className="privacy-fourth-part">
        <h4>3. How We Share Your Information</h4>
        <p>
          We do not sell or rent your personal information. However, we may
          share your data with:
        </p>
        <ul>
          <li>
            <b>Service Providers:</b>Payment processors, shipping partners, and
            customer support services.
          </li>
          <li>
            <b>Legal Authorities:</b>When required by law or to protect our
            rights.
          </li>
        </ul>
      </div>
      <div className="privacy-fifth-part">
        <h4>4. Data Security</h4>
        <p>
          We implement security measures to protect your personal data from
          unauthorized access, alteration, or loss, including encryption of
          sensitive data like passwords. However, no system is 100% secure, so
          we encourage safe online practices.
        </p>
      </div>
      <div className="privacy-sixth-part">
        <h4>5. Your Rights</h4>
        <p>You have the right to:</p>
        <ul>
          <li>Access and correct your personal information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request information on how your data is used.</li>
        </ul>
        <p>To exercise your rights, contact us at jcodeuniverse01@gmail.com.</p>
      </div>
      <div className="privacy-seventh-part">
        <h4>6. Cookies Policy</h4>
        <p>
          We use cookies to improve your experience. You can manage cookie
          preferences in your browser settings.
        </p>
      </div>
      <div className="privacy-seventh-part">
        <h4>7. Third-Party Links</h4>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for their privacy practices.
        </p>
      </div>
      <div className="privacy-eighth-part">
        <h4>8. Changes to This Policy</h4>
        <p>
          We may update this policy from time to time. Changes will be posted on
          this page with an updated effective date.
        </p>
      </div>
      <div className="privacy-ninth-part">
        <h4>9. Contact Us</h4>
        <p>
          If you have any questions, please contact us at:
          jcodeuniverse01@gmail.com
        </p>
      </div>
      <div className="privacy-tenth-part">
        By using www.klaaton.com, you agree to this Privacy Policy.
      </div>
    </div>
  );
}
