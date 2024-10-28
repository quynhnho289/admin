import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { authentication } from './authentication';
export function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
    return (
        <Route {...rest} render={(props) => (
            authentication.isAuthentication() ?
                <Layout {...props} >
                    <Component
                        {...props}
                    />
                </Layout>
                : <Redirect to='/login' />
        )} />
    )
}