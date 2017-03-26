import React from 'react';
import { shallow } from 'enzyme';
import CloseButton from './close-button';

test('Renders correctly', () => {
  const wrapper = shallow(<CloseButton onClick={() => {}} isVisible />);
  expect(wrapper.find('.CloseButton').exists()).toBe(true);
});

test('When isVisible is set to false returns null', () => {
  const wrapper = shallow(<CloseButton onClick={() => {}} isVisible={false} />);
  expect(wrapper.type()).toBe(null);
});

test('onClick is called when clicking button', () => {
  const onClick = jest.fn();
  const wrapper = shallow(<CloseButton isVisible onClick={onClick} />);
  wrapper.find('.CloseButton').simulate('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});
