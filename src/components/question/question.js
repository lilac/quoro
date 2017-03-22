import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchQuestion, clearQuestion } from '../../actions/active-question';
import { deleteQuestion } from '../../actions/questions';

import Answer from '../answer/answer';
import List from '../list/list';
import AnswerForm from '../answer-form/answer-form';

if (process.env.BROWSER) {
  require('./question.css');
}

class Question extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false,
    };
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchQuestion(id, this.props.user.token);
  }

  componentWillUnmount() {
    this.props.clearQuestion();
  }

  render() {
    const { question, author, answers, user: { token } } = this.props;

    if (this.state.isDeleted) {
      return (<Redirect to="/" />);
    }

    if (!question) {
      return null;
    }

    const { title, content, userId, id: questionId } = question;
    const { username, id } = author;
    const xSign = id === userId ? (
      <button
        className="btn btn-md btn-warning"
        onClick={() => {
          this.props.deleteQuestion(questionId, token);
          this.setState({ isDeleted: true });
        }}
      >
        Delete
      </button>
      ) : null;
    return (
      <div className="Question container">
        <div className="Question-content jumbotron">
          {xSign}
          <h1>{title}</h1>
          <p>{content}</p>
          <p>Asked by {username}</p>
        </div>
        <div className="Question-answers">
          <AnswerForm questionId={questionId} />
          <List data={answers} component={Answer} />
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  answers: PropTypes.array,
  author: PropTypes.object,
  isLoading: PropTypes.bool,
  fetchQuestion: PropTypes.func.isRequired,
  clearQuestion: PropTypes.func.isRequired,
  user: PropTypes.object,
  deleteQuestion: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  question: state.activeQuestion.question,
  answers: state.activeQuestion.answers,
  author: state.activeQuestion.author,
  isLoading: state.activeQuestion.isLoading,
});

export default connect(mapStateToProps, { fetchQuestion, clearQuestion, deleteQuestion })(Question);
