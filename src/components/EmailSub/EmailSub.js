import React, { useState } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styles from './EmailSub.module.scss';

const _emailSub = ({ data }) => {
  const { emailSub } = data.site.siteMetadata;
  const [isSubSuccess, setIsSubSuccess] = useState(false);

  const handleEmailSub = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await sendSubReq(formData.get('email'));
    if (res && res.email) {
      setIsSubSuccess(true);
    }
  };

  const sendSubReq = async email => {
    let response;
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email })
    };
    try {
      response = await (await fetch(emailSub, options)).json();
    } catch (error) {
      console.error('error', error);
      response = error;
    }
    return response;
  };

  const subForm = () => (
    <div className={styles['email-sub']}>
      <h4 className={styles['title']}>
        Subscribe for monthly email newsletter
      </h4>
      <form name="email-sub" className={styles['form']} onSubmit={handleEmailSub}>
        <div className={styles['email-field']}>
          <input
            name="email"
            type="text"
            className="feedback-input"
            id="email"
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="please enter a valid email"
            required
            autoComplete="email"
          />
        </div>
        <div className={styles['submit']}>
          <button type="submit">SUBSCRIBE!</button>
        </div>
      </form>
    </div>
  );

  const subSuccess = () => (
    <div className={styles['sub-success']}>
      <span>Subscription Successful !!!</span>
    </div>
  );

  return isSubSuccess === false ? subForm() : subSuccess();
};

export const EmailSub = () => (
  <StaticQuery
    query={graphql`
      query EmailSubQuery {
        site {
          siteMetadata {
            emailSub
          }
        }
      }
    `}
    render={data => <_emailSub data={data} />}
  />
);

export default EmailSub;
