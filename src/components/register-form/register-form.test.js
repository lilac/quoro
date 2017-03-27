import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { RegisterForm } from './register-form';

describe('RegisterForm', () => {
  const props = {
    register() {},
    user: {},
  };

  test('renders', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    expect(wrapper.find('.RegisterForm').exists()).toBe(true);
  });

  test('if user is logged, it will return Redirect', () => {
    const specificProps = Object.assign({}, props, {
      user: {
        token: '123',
      },
    });
    const wrapper = shallow(<RegisterForm {...specificProps} />);
    expect(wrapper.type()).toBe(Redirect);
  });

  test('On image upload it saves it in the state as Base64 encoded string', (done) => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const file = new File(['1231231', '123123123', '12312312312', '123123123'], 'a.jpg');
    const reader = new FileReader();

    wrapper.find('#avatar').simulate('change', {
      target: {
        files: [
          file,
        ],
      },
    });

    reader.addEventListener('load', () => {
      const { result } = reader;
      expect(wrapper.state('avatar')).toBe(result);
      done();
    });

    reader.readAsDataURL(file);
  });

  test('login is saved in the state', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const value = 'login';
    wrapper.find('#login').simulate('change', { target: { value } });
    expect(wrapper.state('login')).toBe(value);
  });

  test('password is saved in the state', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const value = 'password';
    wrapper.find('#password').simulate('change', { target: { value } });
    expect(wrapper.state('password')).toBe(value);
  });

  test('repeatPassword is saved in the state', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const value = 'repeatPassword';
    wrapper.find('#repeatPassword').simulate('change', { target: { value } });
    expect(wrapper.state('repeatPassword')).toBe(value);
  });

  test('email is saved in the state', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const value = 'email';
    wrapper.find('#email').simulate('change', { target: { value } });
    expect(wrapper.state('email')).toBe(value);
  });

  test('username is saved in the state', () => {
    const wrapper = shallow(<RegisterForm {...props} />);
    const value = 'username';
    wrapper.find('#username').simulate('change', { target: { value } });
    expect(wrapper.state('username')).toBe(value);
  });

  test('onSubmit() wont call register if the form isnt filled', () => {
    const register = jest.fn();
    const specificProps = Object.assign({}, props, {
      register,
    });
    const wrapper = shallow(<RegisterForm {...specificProps} />);
    wrapper.find('.RegisterForm').simulate('submit', { preventDefault() {} });
    expect(register).toHaveBeenCalledTimes(0);
  });

  test('onSubmit() wont call register if the passwords doesnt match', () => {
    const register = jest.fn();
    const specificProps = Object.assign({}, props, {
      register,
    });
    const wrapper = shallow(<RegisterForm {...specificProps} />);
    wrapper.setState({
      login: 'login',
      username: 'username',
      password: 'password',
      repeatPassword: 'repeatPassword',
      email: 'email',
    });
    wrapper.find('.RegisterForm').simulate('submit', { preventDefault() {} });
    expect(register).toHaveBeenCalledTimes(0);
  });

  test('onSubmit() will call register if the requirements will be met', () => {
    const register = jest.fn();
    const specificProps = Object.assign({}, props, {
      register,
    });
    const wrapper = shallow(<RegisterForm {...specificProps} />);
    const login = 'login';
    const username = 'username';
    const password = 'password';
    const email = 'email';
    const avatar = 'avatar';
    wrapper.setState({
      login,
      username,
      password,
      email,
      avatar,
      repeatPassword: 'password',
    });
    wrapper.find('.RegisterForm').simulate('submit', { preventDefault() {} });
    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith({ login, username, password, email, avatar });
  });
});
