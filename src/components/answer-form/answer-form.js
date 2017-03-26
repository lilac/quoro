import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addAnswer } from '../../actions/active-question';

if (process.env.BROWSER) {
  require('./answer-form.css');
}

export class AnswerForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { content } = this.state;
    const { addAnswer, questionId, userId, token } = this.props;
    if (content) {
      addAnswer(content, questionId, userId, token);
      this.setState({ content: '' });
    }
  }

  render() {
    return (
      <form
        onSubmit={e => this.onSubmit(e)}
        className="AnswerForm"
      >
        <textarea
          type="text"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          className="AnswerForm-content"
        />
        <button
          className="btn btn-success"
          onClick={e => this.onSubmit(e)}
        >
          Answer
        </button>
      </form>
    );
  }
}

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { token, id } = state.user;
  return {
    token,
    userId: id,
  };
};

export default connect(mapStateToProps, { addAnswer })(AnswerForm);
