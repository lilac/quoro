import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './search-box';

test('Renders SearchBox', () => {
  const wrapper = shallow(<SearchBox />);
  expect(wrapper.find('.SearchBox').exists()).toBe(true);
});

