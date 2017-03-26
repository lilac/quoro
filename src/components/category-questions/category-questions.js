import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchCategory, setCategory } from '../../actions/active-category';
import findInArray from '../../helpers/find-in-array';

import List from '../list/list';
import QuestionPreview from '../question-preview/question-preview';

class CategoryQuestions extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    const { categories } = this.props;
    const category = findInArray(categories, parseInt(id, 10), ['categoryId']);
    this.props.fetchCategory(id, category.title);
  }

  componentWillUnmount() {
    this.props.setCategory({ questions: [], title: '' });
  }

  render() {
    const { questions, title } = this.props;

    return (
      <div
        className="CategoryQuestions"
      >
        <div
          className="text-center"
        >
          <h1
            className="display-3"
          >
            {title}
          </h1>
        </div>
        <div
          className="container"
        >
          <List
            data={questions}
            component={QuestionPreview}
            className="list-group"
          />
        </div>
      </div>
    );
  }
}

CategoryQuestions.propTypes = {
  questions: PropTypes.array,
  title: PropTypes.string,
  fetchCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  setCategory: PropTypes.func.isRequired,
};

CategoryQuestions.defaultProps = {
  categories: [],
  questions: [],
  title: '',
};

const mapStateToProps = state =>
  ({
    questions: state.activeCategory.questions,
    title: state.activeCategory.title,
    categories: state.categories.categories,
  });

export default connect(mapStateToProps, { fetchCategory, setCategory })(CategoryQuestions);
