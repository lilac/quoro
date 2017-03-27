import React from 'react';
import { shallow } from 'enzyme';
import { spinner as Spinner } from './spinner';

describe('Spinner', () => {
  test('renders', () => {
    const wrapper = shallow(<Spinner isLoading />);
    expect(wrapper.find('.Spinner').exists()).toBe(true);
  });

  test('returns null if isLoading is set to false', () => {
    const wrapper = shallow(<Spinner isLoading={false} />);
    expect(wrapper.type()).toBe(null);
  });
});
