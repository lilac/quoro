import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { register } from '../../actions/user';

import Avatar from '../avatar/avatar';

if (process.env.BROWSER) {
  require('./register-form.css');
}

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      repeatPassword: '',
      email: '',
      username: '',
      avatar: '',
      error: '',
    };
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  onSubmit(e) {
    e.preventDefault();
    const { login, username, password, repeatPassword, email, avatar } = this.state;

    if (!login || !username || !password || !repeatPassword || !email) {
      return this.setState({ error: 'You must fill all inputs before continuing.' });
    }

    if (password !== repeatPassword) {
      return this.setState({ error: 'Provided passwords dont match.' });
    }

    this.setState({ error: '', login: '', password: '', repeatPassword: '', email: '', username: '', avatar: '' });

    return this.props.register({ login, username, password, email, avatar });
  }

  onFileChange(e) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const avatar = reader.result;
      this.setState({ avatar });
    });

    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    const { token } = this.props.user;
    const { avatar } = this.state;

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
          <div className="form-group">
            <label
              htmlFor="avatar"
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              className="form-control-file"
              placeholder="Avatar"
              accept=".png,.jpeg,.jpg"
              onChange={e => this.onFileChange(e)}
            />
          </div>
          <Avatar src={avatar} alt="Chosen avatar" />
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

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { register })(RegisterForm);
