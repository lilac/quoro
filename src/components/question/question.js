import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';
import { fetchQuestion, clearQuestion } from '../../actions/active-question';

class Question extends Component {

  constructor(props) {
    super(props);

    this.state = {
      question: null,
      author: null,
      answers: [],
      isLoading: false,
      error: '',
    };
  }

  componentWillMount() {
    const id = this.props.params.id;
    this.props.fetchQuestion(id, this.props.token);
  }

  componentWillUnmount() {
    this.props.clearQuestion();
  }

  render() {
    if (this.state.error) {
      return (<p>{this.state.error}</p>);
    }

    if (this.state.isLoading) {
      return (<Spinner />);
    }

    return (
      <div className="Question">
        <h2>Question</h2>
      </div>
    );
  }
}

Question.propTypes = {};

const mapStateToProps = state => ({ token: state.user.activeUser.token });

export default connect(mapStateToProps, { fetchQuestion, clearQuestion })(Question);
