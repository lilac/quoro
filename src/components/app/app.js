import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchQuestions } from '../../actions/questions';
import QuestionsList from '../questions-list/questions-list';
import LastViewedQuestions from '../last-viewed-questions/last-viewed-questions';
import QuestionForm from '../question-form/question-form';
import Modal from '../question-modal/question-modal';
import socket from '../../socket-client';

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

  componentDidMount() {
    const { fetchQuestions } = this.props;
    const { amountOfQuestions } = this.state;
    console.log(amountOfQuestions);
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
    const { user: { token }, questions } = this.props;
    if (!token) {
      return (<Redirect to="/login" />);
    }

    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-3">
            Cos tu bd
          </div>
          <div className="col-6">
            <div className="App-question-form">
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#questionModal"
                >
                  Ask Question
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
            <LastViewedQuestions />
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
