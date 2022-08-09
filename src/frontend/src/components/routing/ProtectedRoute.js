import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { AuthContext } from '../../contexts/AuthContext';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
export default ProtectedRoute;
