import React, { Component, PropTypes } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchQuestions(this.state.query);
  }

  render() {
    return (
      <form
        className="SearchBox form-inline my-2 my-lg-0"
        onSubmit={e => this.onSubmit(e)}
      >
        <input
          className="SearchBox-input form-control mr-sm-2"
          value={this.state.query}
          type="text"
          placeholder="Search"
          onChange={e => this.setState({ query: e.target.value })}
        />
        <button
          className="SearchBox-btn btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={e => this.onSubmit(e)}
        >
        Search
        </button>
      </form>
    );
  }
}

SearchBox.propTypes = {
  searchQuestions: PropTypes.func,
};

export default SearchBox;
