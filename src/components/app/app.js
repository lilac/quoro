import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from '../../actions/questions';
import socket from '../../socket-client';

import QuestionsList from '../questions-list/questions-list';
import QuestionForm from '../question-form/question-form';
import Modal from '../question-modal/question-modal';
import UserPreview from '../user-preview/user-preview';

if (process.env.BROWSER) {
  require('./app.css');
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amountOfQuestions: 10,
    };
  }

  componentWillMount() {
    const { fetchQuestions } = this.props;
    const { amountOfQuestions } = this.state;
    fetchQuestions(amountOfQuestions);
    let counter = 0;
    socket.on('ADD_QUESTION', () => {
      counter += 1;
      if (counter > 4) {
        fetchQuestions(amountOfQuestions);
        counter = 0;
      }
    });
  }

  loadMore() {
    const amountOfQuestions = this.state.amountOfQuestions + 10;
    this.setState({ amountOfQuestions });
    this.props.fetchQuestions(amountOfQuestions);
  }

  render() {
    const { questions } = this.props;

    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-3">
            <UserPreview />
          </div>
          <div className="col-6">
            <div className="card text-center">
              <div className="card-block">
                <h4 className="card-title">Ask Question</h4>
                <p className="card-text">Aint it what you waiting for!?</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#questionModal"
                >
                  Ask
                </button>
              </div>
              <Modal modalId="questionModal" title="Ask Question">
                <QuestionForm />
              </Modal>
            </div>
            <QuestionsList questions={questions} />
            <div className="text-center">
              <button
                className="btn btn-info"
                onClick={() => this.loadMore()}
              >
                Load more..
              </button>
            </div>
          </div>
          <div className="col-3">
            Co tu dac?
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  questions: PropTypes.array.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = state =>
  ({ questions: state.questions.questions, user: state.user });

export default connect(mapStateToProps, { fetchQuestions })(App);
