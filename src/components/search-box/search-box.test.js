import React from 'react';
import { shallow } from 'enzyme';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  const props = {
    questions: [],
    setSearchedQuestions() {},
    searchQuestions() {},
  };

  test('renders', () => {
    const wrapper = shallow(<SearchBox {...props} />);
    expect(wrapper.find('.SearchBox').exists()).toBe(true);
  });

  // czy dropdown jest wyswietlany, input simulate, ilosc wywolan

});
