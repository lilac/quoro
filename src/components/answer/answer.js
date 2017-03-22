import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteAnswer } from '../../actions/active-question';

if (process.env.BROWSER) {
  require('./answer.css');
}

const answer = (props) => {
  const { content, answerId, userId, user, questionId } = props;
  const { token, id: activeUserId } = user;
  const xSign = (userId === activeUserId) ?
    (
      <button
        className="btn btn-md"
        onClick={() => props.deleteAnswer(answerId, questionId, token)}
      >
        DeleteX
      </button>
    ) : null;

  return (
    <div className="Answer">
      {xSign}
      <p>{content}</p>
    </div>
  );
};

answer.propTypes = {
  content: PropTypes.string,
  answerId: PropTypes.number,
  userId: PropTypes.number,
  user: PropTypes.object,
  questionId: PropTypes.number,
  deleteAnswer: PropTypes.func,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { deleteAnswer })(answer);
