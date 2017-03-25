import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./question-modal.css');
}

const modal = (props) => {
  const { modalId, title, children } = props;
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={title}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

modal.propTypes = {
  title: PropTypes.string.isRequired,
  modalId: PropTypes.string.isRequired,
};

export default modal;
