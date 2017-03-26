import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './avatar';

test('Renders correctly', () => {
  const wrapper = shallow(<Avatar src="src" />);
  expect(wrapper.find('.Avatar').exists()).toBe(true);
});

test('When no src provided returns null', () => {
  const wrapper = shallow(<Avatar />);
  expect(wrapper.type()).toBe(null);
});

test('When no alt provided, its being set to Avatar', () => {
  const wrapper = shallow(<Avatar src="src" />);
  expect(wrapper.find('.Avatar').prop('alt')).toBe('Avatar');
});


