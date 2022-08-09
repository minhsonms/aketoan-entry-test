import Alert from 'react-bootstrap/Alert';
import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ info }) => {
  return info === null ? null : <Alert variant={info.type}>{info.message}</Alert>;
};
AlertMessage.propTypes = {
  info: PropTypes.string.isRequired,
};
export default AlertMessage;
