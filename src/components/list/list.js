import React, { PropTypes } from 'react';

const renderList = (data, Component) =>
  data.map(props => (<Component key={Math.random()} {...props} />));

const list = (props) => {
  if (!props.component || !props.data) {
    return null;
  }

  const renderedList = renderList(props.data, props.component);

  return (
    <div className="List">
      {renderedList}
    </div>
  );
};

list.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default list;
