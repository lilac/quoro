import React from 'react';
import { shallow } from 'enzyme';
import { app as App } from './app';


it('renders with provided children', () => {
  const wrapper = shallow(<App user={{ username: 'username' }} > <div className="test" /> </App>);
  expect(wrapper.find('.App').exists()).toBe(true);
  expect(wrapper.find('.test').exists()).toBe(true);
});

it('renders loginBox while no user provided', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.App-login').exists()).toBe(true);
});
