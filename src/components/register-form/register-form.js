import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { register } from '../../actions/user';

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      repeatPassword: '',
      email: '',
      username: '',
      error: '',
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  onSubmit(e) {
    e.preventDefault();
    const { login, username, password, repeatPassword, email } = this.state;

    if (!login || !username || !password || !repeatPassword || !email) {
      return this.setState({ error: 'You must fill all inputs before continuing.' });
    }

    if (password !== repeatPassword) {
      return this.setState({ error: 'Provided passwords dont match.' });
    }

    this.setState({ error: '', login: '', password: '', repeatPassword: '', email: '', username: '' });

    return this.props.register({ login, username, password, email });
  }

  render() {
    const { token } = this.props.user;
    if (token) {
      return (<Redirect to="/" />);
    }
    return (
      <div className="RegisterForm">
        <form
          onSubmit={e => this.onSubmit(e)}
        >
          <div className="form-group">
            <label
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="E-mail"
              value={this.state.email}
              onChange={e => this.onChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="login"
            >
              Login
            </label>
            <input
              type="text"
              id="login"
              className="form-control"
              value={this.state.login}
              onChange={e => this.onChange('login', e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.onChange('password', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password-repeat"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="password-repeat"
              className="form-control"
              placeholder="Repeat password"
              value={this.state.repeatPassword}
              onChange={e => this.onChange('repeatPassword', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.onChange('username', e.target.value)}
            />
          </div>
          {this.state.error ? (<p>{this.state.error}</p>) : null}
          <button
            type="submit"
            className="btn btn-success"
            onClick={e => this.onSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { register })(RegisterForm);
