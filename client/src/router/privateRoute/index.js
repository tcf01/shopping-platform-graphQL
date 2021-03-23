import React from 'react';
import { Route } from 'react-router';

const PrivateRoute = ({ component, role, ...rest }) => {
    return (
        <Route component={component} {...rest} />
    )
}

export default PrivateRoute;


