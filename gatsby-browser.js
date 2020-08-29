'use strict';

require('./src/assets/scss/init.scss');

exports.onClientEntry = () => {};

exports.onServiceWorkerUpdateReady = () => {
  // eslint-disable-next-line
  const answer = window.confirm('My page has been updated. Would you like to reload and display the latest version?');

  if (answer === true) {
    window.location.reload();
  }
};
