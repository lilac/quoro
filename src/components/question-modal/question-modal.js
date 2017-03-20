import React from 'react';

const modal = (props) => {
  return (
    <div
      className="modal fade"
      id={props.modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={props.title}
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
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
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default modal;
