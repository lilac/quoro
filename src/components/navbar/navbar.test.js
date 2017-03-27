import React from 'react';
import { shallow } from 'enzyme';
import { navbar as Navbar } from './navbar';

test('Renders correctly', () => {
  const wrapper = shallow(<Navbar logOut={() => {}} username="primosdace" />);
  expect(wrapper.find('.Navbar').exists()).toBe(true);
});

test('onClick in logout button calls logOut()', () => {
  const logOut = jest.fn();
  const username = 'primosdace';
  const wrapper = shallow(<Navbar logOut={logOut} username={username} />);
  wrapper.find('.Navbar-logout').simulate('click');
  expect(logOut).toHaveBeenCalledTimes(1);
  expect(logOut).toHaveBeenCalledWith(username);
});
