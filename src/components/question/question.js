import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';
import Answer from '../answer/answer';
import List from '../list/list';
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
    if (!this.props.user) {
      return (<Redirect to="/login" />);
    }

    if (this.props.error) {
      return (<p>{this.props.error}</p>);
    }

    if (!this.props.question || !this.props.author || !this.props.answers) {
      return (<Spinner />);
    }

    const { title, content, id } = this.props.question;
    const answers = this.props.answers;
    const { username, id: userId } = this.props.author;
    return (
      <div className="Question container">
        <div className="Question-content jumbotron">
          <h1>{title}</h1>
          <p>{content}</p>
          <p>Question id: {id}, asked by {username} with id: {userId}</p>
        </div>
        <div className="Question-answers">
          <List data={answers} component={Answer} />
        </div>
      </div>
    );
  }
}

Question.propTypes = {};

const mapStateToProps = state => ({
  user: state.user.activeUser,
  question: state.activeQuestion.question,
  answers: state.activeQuestion.answers,
  author: state.activeQuestion.author,
  error: state.activeQuestion.error,
});

export default connect(mapStateToProps, { fetchQuestion, clearQuestion })(Question);
