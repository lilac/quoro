import React from 'react';
import { shallow } from 'enzyme';
import List from './list';

test('Renders correctly', () => {
  const wrapper = shallow(<List component={() => (<div />)} data={[]} />);
  expect(wrapper.find('.List').exists()).toBe(true);
});

test('When no component provided returns null', () => {
  const wrapper = shallow(<List data={[]} />);
  expect(wrapper.type()).toBe(null);
});

test('When no data provided returns null', () => {
  const wrapper = shallow(<List component={() => (<div />)} />);
  expect(wrapper.type()).toBe(null);
});
