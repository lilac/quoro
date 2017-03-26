import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteAnswer } from '../../actions/active-question';

import CloseButton from '../close-button/close-button';

if (process.env.BROWSER) {
  require('./answer.css');
}

export const answer = (props) => {
  const { content, answerId, userId, user, questionId } = props;
  const { token, id: activeUserId } = user;

  return (
    <div
      className="Answer"
    >
      <CloseButton
        onClick={() => props.deleteAnswer(answerId, questionId, token)}
        isVisible={(userId === activeUserId)}
      />
      <p>{content}</p>
    </div>
  );
};

answer.propTypes = {
  content: PropTypes.string.isRequired,
  answerId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  questionId: PropTypes.number.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { deleteAnswer })(answer);
