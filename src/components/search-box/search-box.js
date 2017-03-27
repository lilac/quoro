import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { searchQuestions, setSearchedQuestions } from '../../actions/questions';

import List from '../list/list';
import QuestionLink from '../question-link/question-link';

if (process.env.BROWSER) {
  require('./search-box.css');
}

export class SearchBox extends Component {

  onChange(query) {
    if (!query) {
      return this.props.setSearchedQuestions([]);
    }
    return this.props.searchQuestions(query);
  }

  render() {
    const { questions } = this.props;
    const cuttedQuestions = questions.slice(0, 4);
    const dropdown = cuttedQuestions.length ? (
      <div
        className="SearchBox-dropdown"
      >
        <List
          className="list-group"
          data={cuttedQuestions}
          component={QuestionLink}
        />
      </div>
    ) : null;
    return (
      <div
        className="SearchBox"
      >
        <input
          className="SearchBox-input form-control mr-sm-2"
          type="text"
          placeholder="Search"
          onChange={e => this.onChange(e.target.value)}
        />
        {dropdown}
      </div>
    );
  }
}

SearchBox.propTypes = {
  setSearchedQuestions: PropTypes.func.isRequired,
  searchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array,
};

const mapStateToProps = state =>
  ({ questions: state.questions.searchByQueryQuestions });

export default connect(mapStateToProps, { searchQuestions, setSearchedQuestions })(SearchBox);
