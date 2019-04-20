import React from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp/SignUp';
import { PasswordForgetLink } from '../PasswordForget/PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignIn = props => {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

const InitialState = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...InitialState };
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...InitialState });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { email, password, error } = this.state;
    
    const isInvalid = password === '' || email === '';

    return(
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />
        
        <input 
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <button disabled={isInvalid}>Sign In</button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
export { SignInForm };