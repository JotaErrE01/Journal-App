import React from 'react'
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    component: Component,
    isLoggedIn,
    ...rest
}) => (
    <Route
        {...rest}
        component={ props => (
            isLoggedIn ? 
                <Component {...props} />
            :
                <Redirect to="/auth/login" />
        ) }
    />
)

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

export default PrivateRoute;