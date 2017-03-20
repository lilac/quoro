import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';
import Answer from '../answer/answer';
import List from '../list/list';
import AnswerForm from '../answer-form/answer-form';
import { fetchQuestion, clearQuestion } from '../../actions/active-question';
import { deleteQuestion } from '../../actions/questions';

class Question extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchQuestion(id, this.props.user.token);
  }

  componentWillUnmount() {
    this.props.clearQuestion();
  }

  render() {
    const { user: { token } } = this.props;
    if (!token) {
      return (<Redirect to="/login" />);
    }

    console.log(this.props);

    const { question, author, answers } = this.props;

    const { title, content, userId, id: questionId } = question;
    const { username, id } = author;
    const xSign = id === userId ? (
      <button
        className="btn btn-md btn-warning"
        onClick={() => this.props.deleteQuestion(questionId, token)}
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
          <AnswerForm questionId={id} />
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
  fetchQuestion: PropTypes.func.isRequired,
  clearQuestion: PropTypes.func.isRequired,
  user: PropTypes.object,
  deleteQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  question: state.activeQuestion.question,
  answers: state.activeQuestion.answers,
  author: state.activeQuestion.author,
});

export default connect(mapStateToProps, { fetchQuestion, clearQuestion, deleteQuestion })(Question);
