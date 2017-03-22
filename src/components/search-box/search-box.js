import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import List from '../list/list';
import QuestionPreview from '../question-preview/question-preview';
import { searchQuestions, setSearchedQuestions } from '../../actions/questions';

if (process.env.BROWSER) {
  require('./search-box.css');
}

class SearchBox extends Component {

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
      <div className="SearchBox-dropdown">
        <List data={cuttedQuestions} component={QuestionPreview} />
      </div>
    ) : null;
    return (
      <div className="SearchBox">
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
};

const mapStateToProps = state =>
  ({ questions: state.questions.searchByQueryQuestions });

export default connect(mapStateToProps, { searchQuestions, setSearchedQuestions })(SearchBox);
