import React from 'react';
import { Redirect } from 'react-router-dom';
import { shallow } from 'enzyme';
import { loginBox as LoginBox } from './login-box';

const user = {
  token: '123',
};

test('Renders correctly', () => {
  const wrapper = shallow(<LoginBox user={{}} />);
  expect(wrapper.find('.LoginBox').exists()).toBe(true);
});

test('Redirects when user is logged', () => {
  const wrapper = shallow(<LoginBox user={user} />);
  expect(wrapper.type()).toBe(Redirect);
});
