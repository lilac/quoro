import React, { PropTypes } from 'react';

if (process.env.BROWSER) {
  require('./list.css');
}

const renderList = (data, Component) =>
  data.map(props => (<Component key={Math.random()} {...props} />));

const list = (props) => {
  if (!props.component || !props.data) {
    return null;
  }

  const renderedList = renderList(props.data, props.component);

  return (
    <div className={`List ${props.className}`}>
      {renderedList}
    </div>
  );
};

list.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default list;
