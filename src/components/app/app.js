import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { fetchQuestions } from '../../actions/questions';
import QuestionsList from '../questions-list/questions-list';
import LastViewedQuestions from '../last-viewed-questions/last-viewed-questions';
import QuestionForm from '../question-form/question-form';

if (process.env.BROWSER) {
  require('./app.css');
}

class App extends Component {

  componentDidMount() {
    this.props.fetchQuestions(10);
  }

  render() {
    const { user, questions } = this.props;
    if (!user) {
      return (<Redirect from="/" to="/login" />);
    }

    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-9">
            <QuestionForm />
            <QuestionsList questions={questions} />
          </div>
          <div className="col-3">
            <LastViewedQuestions />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  questions: PropTypes.array,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = state =>
  ({ questions: state.questions.questions, user: state.user.activeUser });

export default connect(mapStateToProps, { fetchQuestions })(App);
