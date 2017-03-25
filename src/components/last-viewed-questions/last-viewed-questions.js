import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../list/list';
import QuestionLink from '../question-link/question-link';

const lastViewedQuestions = (props) => {
  const { questions } = props;
  return (
    <div className="LastViewedQuestions">
      <p>Last viewed:</p>
      <List
        data={questions}
        component={QuestionLink}
        className="list-group"
      />
    </div>
  );
};

lastViewedQuestions.propTypes = {
  questions: PropTypes.array,
};

lastViewedQuestions.defaultProps = {
  questions: [],
};

const mapStateToProps = state => ({ questions: state.questions.lastViewedQuestions });

export default connect(mapStateToProps, null)(lastViewedQuestions);
