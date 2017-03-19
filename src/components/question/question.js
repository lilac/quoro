import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';
import Answer from '../answer/answer';
import List from '../list/list';
import AnswerForm from '../answer-form/answer-form';
import { fetchQuestion, clearQuestion } from '../../actions/active-question';

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

    const { question, author, answers, error } = this.props;

    if (error) {
      return (<p>{error}</p>);
    }

    if (!question || !author || !answers) {
      return (<Spinner />);
    }

    const { title, content, id } = question;
    const { username } = author;
    return (
      <div className="Question container">
        <div className="Question-content jumbotron">
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
  error: PropTypes.string,
  fetchQuestion: PropTypes.func,
  clearQuestion: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.user,
  question: state.activeQuestion.question,
  answers: state.activeQuestion.answers,
  author: state.activeQuestion.author,
  error: state.activeQuestion.error,
});

export default connect(mapStateToProps, { fetchQuestion, clearQuestion })(Question);
