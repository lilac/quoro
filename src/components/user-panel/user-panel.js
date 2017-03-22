import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getUserQuestions } from '../../actions/questions';

import QuestionPreview from '../question-preview/question-preview';
import List from '../list/list';

class UserPanel extends Component {

  componentWillMount() {
    this.props.getUserQuestions(this.props.user.id);
  }

  render() {
    const { questions, user: { username } } = this.props;

    const howManyQuestionsAsked = questions.length;
    return (
      <div className="UserPanel">
        <div className="container">
          <h1 className="">Good to see you around, {username}</h1>
          <div className="row">
            <div className="col">
              <h3>Statistics</h3>
              <p>Questions asked: {howManyQuestionsAsked}</p>
            </div>
            <div className="col">
              <List data={questions} component={QuestionPreview} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserPanel.propTypes = {
  questions: PropTypes.array,
  user: PropTypes.object,
  getUserQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  ({ user: state.user, questions: state.questions.userQuestions });

export default connect(mapStateToProps, { getUserQuestions })(UserPanel);
