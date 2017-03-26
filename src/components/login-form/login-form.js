import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logIn } from '../../actions/user';

if (process.env.BROWSER) {
  require('./login-form.css');
}

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { login, password } = this.state;
    if (!login || !password) {
      this.setState({ error: '' });
      return null;
    }

    return this.props.logIn(login, password);
  }

  render() {
    return (
      <form
        onSubmit={e => this.onSubmit(e)}
      >
        <div
          className="form-group"
        >
          <label
            htmlFor="login"
          >
            Login
          </label>
          <input
            type="text"
            id="login"
            className="form-control"
            placeholder="Login"
            value={this.state.login}
            onChange={e => this.setState({ login: e.target.value })}
          />
        </div>
        <div
          className="form-group"
        >
          <label
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={e => this.onSubmit(e)}
        >
          Submit
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default connect(null, { logIn })(LoginForm);
