import React from 'react';
import { shallow } from 'enzyme';
import Routes from './routes';

describe('Routes', () => {
  test('renders', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper.find('.Routes').exists()).toBe(true);
  });
});
