import React from 'react';
import List from '../list/list';
import QuestionPreview from '../question-preview/question-preview';

const questionsList = props => (
  <List component={QuestionPreview} data={props.questions || []} className="list-group" />
);

export default questionsList;
