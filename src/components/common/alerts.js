import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => {
  if (!message || Object.keys(message).length === 0) {
    return <span></span>;
  }
  return (
    <div className={`alert alert-${message.type}`}>
      <i className={`icon-${message.icons}`}></i>
      <p>{message.text}</p>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.object,
};

export default Alert;