import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';


// Component  signs out the authenticated user and redirects user to the default route
const UserSignOut = ({context}) => {
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
export default UserSignOut;