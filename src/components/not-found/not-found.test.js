import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './not-found';

test('Renders correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper.find('.NotFound').exists()).toBe(true);
});
