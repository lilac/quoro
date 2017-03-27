import React from 'react';
import { shallow } from 'enzyme';
import QuestionModal from './question-modal';

describe('QuestionModal', () => {
  const props = {
    title: 'title',
    modalId: '123',
  };

  test('renders', () => {
    const wrapper = shallow(<QuestionModal {...props} />);
    expect(wrapper.find('.QuestionModal').exists()).toBe(true);
  });

  test('renders children inside', () => {
    const children = (<div className="children" />);
    const specificProps = Object.assign({}, props, {
      children,
    });
    const wrapper = shallow(<QuestionModal {...specificProps} />);
    expect(wrapper.find('.children').exists()).toBe(true);
  });
});
