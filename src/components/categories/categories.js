import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/categories';

import List from '../list/list';
import CategoryLink from '../category-link/category-link';

class Categories extends Component {

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

const mapStateToProps = state =>
  ({ categories: state.categories.categories });

export default connect(mapStateToProps, { fetchCategories })(Categories);
