import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut/SignOut';
import { AuthUserContext } from '../Session';

const Navigation = props => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavAuth/> : <NavNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);

const NavAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}>Landing</Link></li>
    <li><Link to={ROUTES.HOME}>Home</Link></li>
    <li><Link to={ROUTES.ACCOUNT}>Account</Link></li>
    <li><Link to={ROUTES.ADMIN}>Admin</Link></li>
    <li><SignOutButton /></li>
  </ul>
);

const NavNonAuth = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}>Landing</Link></li>
    <li><Link to={ROUTES.SIGN_IN}>Sign In</Link></li>
  </ul>
)

export default Navigation;