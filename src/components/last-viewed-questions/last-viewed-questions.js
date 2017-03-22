import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../list/list';
import QuestionPreview from '../question-preview/question-preview';

const lastViewedQuestions = (props) => {
  const { questions } = props;
  return (
    <div className="LastViewedQuestions">
      <h5 className="text-center">Last viewed</h5>
      <List data={questions} component={QuestionPreview} />
    </div>
  );
};

lastViewedQuestions.propTypes = {
  questions: PropTypes.array,
};

const mapStateToProps = state => ({ questions: state.questions.lastViewedQuestions });

export default connect(mapStateToProps, null)(lastViewedQuestions);
