import React, { useState } from "react";
import axios from "axios";
import "../compcss/ContactUser.css";

export default function ContactUser() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "da7a3de5-97f0-4568-a032-60ac17c88c3f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact-main">
      <h2>Contact Us</h2>
      <div className="contact-first-box">
        <p>
          We'd love to hear from you! Whether you have a question about an
          order, need styling advice, or just want to share your feedback, our
          team is here to help.
        </p>
      </div>

      <div className="contact-second-box">
        <h4>Get in Touch:</h4>
        <ul>
          <li>
            The quickest way to reach us is by email. We aim to respond to all
            inquiries within 24 hours, Monday through Friday.
          </li>

          <li>
            <b>Email: </b>jcodeuniverse01@gmail.com
          </li>

          <li className="contact-address">
            <b>You can also reach us by mail: </b>
            <ul>
              <li>Klaaton.com</li>
              <li>2nd Floor, Anand Reddy building,</li>
              <li>Shanthipura, Electronics City, Phase 2, Bangalore,</li>
              <li>Karnataka</li>
              <li>PIN code: 560100</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="contact-third-box">
        <h4>Have a Question?</h4>
        <form id="contactForm" onSubmit={onSubmit} className="forms-main">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
          />

          <div id="emailError" class="error"></div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email id"
          />

          <label for="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="Enter your subject"
          />

          <label for="description">Write:</label>
          <textarea
            id="description"
            name="description"
            draggable="false"
            required
            placeholder="Write your message"
          ></textarea>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
