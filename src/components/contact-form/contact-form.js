import React from 'react';
import './contact-form.scss';

const THANK_YOU_ROUTE = '/thank-you';

const contactForm = () => (
  <form name="contact" className="form" id="contact-form" action={THANK_YOU_ROUTE} method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <div className="form-title">Or, you may fill this form to reach me</div>
    <p className="name">
      <input
        name="name"
        type="text"
        className="feedback-input"
        placeholder="Name"
        id="name"
        required
        minLength="2"
        maxLength="40"
      />
    </p>

    <p className="email">
      <input
        name="email"
        type="text"
        className="feedback-input"
        id="email"
        placeholder="Email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        title="please enter a valid email"
        required
      />
    </p>

    <p className="message">
      <textarea
        name="message"
        className="feedback-input"
        id="comment"
        placeholder="Comment"
        required
        minLength="5"
        maxLength="1200"
      />
    </p>

    <div className="submit">
      <button type="submit" id="button-blue">
        SEND
      </button>
    </div>
  </form>
);

export default contactForm;
