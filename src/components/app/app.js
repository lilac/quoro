import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { fetchQuestions } from '../../actions/questions';
import Navbar from '../navbar/navbar';
import QuestionsList from '../questions-list/questions-list';

if (process.env.BROWSER) {
  require('./app.css');
}

class App extends Component {

  componentDidMount() {
    this.props.fetchQuestions(10);
  }

  render() {
    if (!this.props.user) {
      return (<Redirect from="/" to="/login" />);
    }

    return (
      <div className="App">
        <Route path="/" render={() => (<Navbar title="Quoro" />)} />
        <QuestionsList questions={this.props.questions} />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = state =>
  ({ questions: state.questions.questions, user: state.user.activeUser });

export default connect(mapStateToProps, { fetchQuestions })(App);
