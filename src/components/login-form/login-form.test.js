import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './login-form';

test('Renders correctly', () => {
  const wrapper = shallow(<LoginForm logIn={() => {}} />);
  expect(wrapper.find('.LoginForm').exists()).toBe(true);
});

test('Value from login input is saved in state', () => {
  const wrapper = shallow(<LoginForm logIn={() => {}} />);
  const value = 'Login';
  wrapper.find('#login').simulate('change', { target: { value } });
  expect(wrapper.state('login')).toBe(value);
});

test('Value from password input is saved in state', () => {
  const wrapper = shallow(<LoginForm logIn={() => {}} />);
  const value = 'Password';
  wrapper.find('#password').simulate('change', { target: { value } });
  expect(wrapper.state('password')).toBe(value);
});

test('onSubmit calls logIn when informations are in the state', () => {
  const logIn = jest.fn();
  const wrapper = shallow(<LoginForm logIn={logIn} />);
  const login = 'login';
  const password = 'password';
  wrapper.setState({ login, password });
  wrapper.find('.LoginForm').simulate('submit', { preventDefault() {} });
  expect(logIn).toHaveBeenCalledTimes(1);
  expect(logIn).toHaveBeenCalledWith(login, password);
});

test('onSubmit doesnt call logIn when there arent enough informations in the state', () => {
  const logIn = jest.fn();
  const wrapper = shallow(<LoginForm logIn={logIn} />);
  wrapper.find('.LoginForm').simulate('submit', { preventDefault() {} });
  expect(logIn).toHaveBeenCalledTimes(0);
});
