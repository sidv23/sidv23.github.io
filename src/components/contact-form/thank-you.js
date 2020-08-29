import React from 'react';
import './thank-you.scss';
import { Link } from 'gatsby';

const ThankYou = () => (
  <div>
    <p>
      <span className="msg-success">Your message is sent successfully.</span>
      <br />I will soon respond to it.
    </p>
    <Link to="/">Go Back to Home</Link>
  </div>
);

export default ThankYou;
