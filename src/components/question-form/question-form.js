import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addQuestion } from '../../actions/questions';

import Avatar from '../avatar/avatar';

if (process.env.BROWSER) {
  require('./question-form.css');
}

class QuestionForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      image: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { title, content, image } = this.state;
    const { user: { token } } = this.props;
    if (title && content) {
      this.props.addQuestion(title, content, image, token);
      this.setState({ title: '', content: '', image: '' });
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val });
  }

  onFileChange(e) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = reader.result;
      this.setState({ image });
    });

    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    const { image } = this.state;
    return (
      <div className="QuestionForm container">
        <h2>Ask Question</h2>
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
          <div className="form-group">
            <label
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              className="form-control-file"
              placeholder="Image"
              accept=".png,.jpeg,.jpg"
              onChange={e => this.onFileChange(e)}
            />
          </div>
          <Avatar
            src={image}
            alt="Question's image"
          />
          <button
            className="btn btn-success btn-block"
            onClick={e => this.onSubmit(e)}
          >
            Ask
          </button>
        </form>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  user: PropTypes.object,
  addQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { addQuestion })(QuestionForm);
