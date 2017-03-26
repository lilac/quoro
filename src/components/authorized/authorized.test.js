import React from 'react';
import { Redirect } from 'react-router';
import { shallow } from 'enzyme';
import { authorized as Authorized } from './authorized';

const mockedUser = {
  token: '123',
  login: 'login',
  username: 'username',
  id: 123,
};

test('When no one is logged in returns Redirect', () => {
  const wrapper = shallow(<Authorized user={{}} />);
  expect(wrapper.type()).toBe(Redirect);
});

test('When user is logged in, returns authorized route', () => {
  const wrapper = shallow(<Authorized user={mockedUser} />);
  expect(wrapper.find('.Authorized').exists()).toBe(true);
});
