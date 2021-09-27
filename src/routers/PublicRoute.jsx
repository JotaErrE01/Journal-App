import React from 'react'
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

const PublicRoute = ({
    isLoggedIn,
    component: Component,
    ...rest
}) =>(
    <Route 
        {...rest}
        component={ props => (
            isLoggedIn ? 
                <Redirect to="/" />
            :
                <Component {...props} />
        )}
    />
)

PublicRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}


export default PublicRoute;