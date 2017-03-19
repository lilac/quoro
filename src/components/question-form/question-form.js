import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/questions';

if (process.env.BROWSER) {
  require('./question-form.css');
}

class QuestionForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, content } = this.state;
    const { user: { token } } = this.props;
    if (title && content) {
      this.props.addQuestion(title, content, token);
      this.setState({ title: '', content: '' });
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  render() {
    return (
      <div className="QuestionForm container">
        <form
          onSubmit={e => this.onSubmit(e)}
        >
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              type="text"
              value={this.state.title}
              onChange={e => this.onChange('title', e.target.value)}
              placeholder="Title"
              id="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              value={this.state.content}
              onChange={e => this.onChange('content', e.target.value)}
              className="form-control"
              placeholder="Content"
              id="content"
            />
          </div>
          <button
            className="btn btn-success"
            onClick={e => this.onSubmit(e)}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { addQuestion })(QuestionForm);
