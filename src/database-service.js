class DatabaseService {
  constructor(controller) {
    Object.assign(this, {
      controller,
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.controller.connect((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.controller.end((err) => {
        if (err) {
          reject(err);
        }
        resolve(this);
      });
    });
  }

  query(query, data) {
    // console.log(query, data);
    return new Promise((resolve, reject) => {
      this.controller.query(query, data, (err, result) => {
        if (err) {
          console.log('baza');
          console.log(err.message);
          reject(err);
        }
        resolve(result);
      });
    });
  }

  createUser(username, login, password, email) {
    const query = 'INSERT INTO users(username, login, password, email) VALUES ($1, $2, $3, $4);';
    const data = [username, login, password, email];
    return this.query(query, data);
  }

  deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1;';
    const data = [id];
    return this.query(query, data);
  }

  updateUser(id) {
    const query = 'UPDATE users SET username=$2, WHERE id = $1;';
    const data = [id];
    return this.query(query, data);
  }

  findUser(login) {
    const query = 'SELECT * FROM users WHERE login = $1;';
    const data = [login];
    return this.query(query, data)
      .then(result => result.rows[0]);
  }

  findAnswers(id) {
    const query = 'SELECT content, answ_id, user_id FROM answers WHERE id_q = $1;';
    const data = [id];
    return this.query(query, data);
  }

  updateAnswer(id, content) {
    const query = 'UPDATE answers SET content = $2 WHERE answ_id = $1;';
    const data = [id, content];
    return this.query(query, data);
  }

  deleteAnswer(id) {
    const query = 'DELETE answers WHERE answ_id = $1;';
    const data = [id];
    return this.query(query, data);
  }

  createAnswer(questionId, userId, content) {
    const query = 'INSERT INTO answers(id_q, content, user_id) VALUES ($1, $2, $3);';
    const data = [questionId, userId, content];
    return this.query(query, data);
  }

  findQuestionWithContent(content) {
    const query = `SELECT id, content, user_id, added_at, username FROM questions, users WHERE questions.user_id = users.id AND content LIKE '%$1%';`;
    const data = [content];
    return this.query(query, data);
  }

  findQuestion(id) {
    const query = 'SELECT * FROM questions WHERE id = $1;';
    const data = [id];
    return this.query(query, data)
      .then(result => result.rows[0])
      .catch(() => null);
  }

  createQuestion(content, userId) {
    const query = 'INSERT INTO questions(content, user_id) VALUES ($1, $2);';
    const data = [content, userId];
    return this.query(query, data);
  }

  deleteQuestion(id) {
    const query = 'DELETE questions WHERE id = $1';
    const data = [id];
    return this.query(data, query);
  }

  findLastQuestions(amount) {
    const query = 'SELECT id, content, added_at FROM Questions ORDER BY added_at DESC LIMIT $1;';
    const data = [amount];
    return this.query(query, data);
  }

}

export default DatabaseService;
