import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAnswer } from '../../actions/active-question';

if (process.env.BROWSER) {
  require('./answer-form.css');
}

class AnswerForm extends Component {

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
    if (content.length) {
      addAnswer(content, questionId, userId, token);
    }
  }

  render() {
    return (
      <div className="AnswerForm">
        <form
          onSubmit={e => this.onSubmit(e)}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { token, id } = state.user;
  return {
    token,
    userId: id
  };
};

export default connect(mapStateToProps, { addAnswer })(AnswerForm);
