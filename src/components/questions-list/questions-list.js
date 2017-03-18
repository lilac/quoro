import React, { PropTypes } from 'react';
import List from '../list/list';
import QuestionPreview from '../question-preview/question-preview';

const questionsList = props => (
  <div className="QuestionsList container">
    <List
      component={QuestionPreview}
      data={props.questions || []}
      className="list-group"
    />
  </div>
);

questionsList.propTypes = {
  questions: PropTypes.array,
};

export default questionsList;
