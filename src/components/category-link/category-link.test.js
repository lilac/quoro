import React from 'react';
import { shallow } from 'enzyme';
import CategoryLink from './category-link';

const category = {
  categoryId: 123,
  title: 'title',
};

test('Renders correctly', () => {
  const wrapper = shallow(<CategoryLink {...category} />);
  expect(wrapper.find('.CategoryLink').exists()).toBe(true);
});
