import React from 'react';
import { shallow } from 'enzyme';
import { alert as Alert } from './alert';

test('renders when message provided', () => {
  const message = 'Hello there.';
  const wrapper = shallow(<Alert message={message} isPositive />);
  expect(wrapper.find('.Alert').exists());
});

test('returns null while no message provided', () => {
  const message = '';
  const wrapper = shallow(<Alert message={message} isPositive />);
  expect(wrapper.type()).toBe(null);
});

test('returns possitive message', () => {
  const message = 'Hello there.';
  const wrapper = shallow(<Alert message={message} isPositive />);
  expect(wrapper.find('.alert-success').exists()).toBe(true);
});

test('returns negative message', () => {
  const isPositive = false;
  const message = 'General Kenobi!';
  const wrapper = shallow(<Alert message={message} isPositive={isPositive} />);
  expect(wrapper.find('.alert-danger').exists()).toBe(true);
});
