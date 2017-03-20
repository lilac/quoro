import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionPreview from '../question-preview/question-preview';
import List from '../list/list';
import { getUserQuestions } from '../../actions/questions';

class UserPanel extends Component {

  componentDidMount() {
    this.props.getUserQuestions(this.props.user.id);
  }

  render() {
    const { questions, user: { username, id, token, login } } = this.props;
    if (!id) {
      return (<Redirect to="/login" />);
    }

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

const mapStateToProps = state =>
  ({ user: state.user, questions: state.questions.userQuestions });

export default connect(mapStateToProps, { getUserQuestions })(UserPanel);
