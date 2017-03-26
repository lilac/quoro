import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/categories';

import List from '../list/list';
import CategoryLink from '../category-link/category-link';

export class Categories extends Component {

  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props;

    if (!categories) {
      return null;
    }

    return (
      <div
        className="Categories"
      >
        <List
          className="list-group"
          component={CategoryLink}
          data={categories}
        />
      </div>
    );
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

const mapStateToProps = state =>
  ({ categories: state.categories.categories });

export default connect(mapStateToProps, { fetchCategories })(Categories);
