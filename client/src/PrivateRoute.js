import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//Component provides private routes for authenticatedUsers to update, create, and delete course
const privateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
    {context => (
      <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
  )}
  </Consumer>
);
};

export default privateRoute