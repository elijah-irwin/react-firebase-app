import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = props => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

const InitialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...InitialState };
  }

  onSubmit = event => {
    event.preventDefault();
    
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Name"
        />

        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
        />

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>Sign Up</button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;
export { SignUpForm, SignUpLink };