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

  createUser(username, login, password, email, avatar) {
    const query = 'INSERT INTO users(username, login, password, email, avatar) VALUES ($1, $2, $3, $4, $5);';
    const data = [username, login, password, email, avatar];
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

  findUserById(id) {
    const query = 'SELECT id, username FROM users WHERE id = $1';
    const data = [id];
    return this.query(query, data)
      .then(result => result.rows[0]);
  }

  findAnswers(id) {
    const query = 'SELECT * FROM answers WHERE id_q = $1;';
    const data = [id];
    return this.query(query, data)
      .then(result => result.rows);
  }

  updateAnswer(id, content) {
    const query = 'UPDATE answers SET content = $2 WHERE answ_id = $1;';
    const data = [id, content];
    return this.query(query, data);
  }

  deleteAnswer(id) {
    const query = 'DELETE FROM answers WHERE answ_id = $1;';
    const data = [id];
    return this.query(query, data);
  }

  createAnswer(questionId, userId, content) {
    const query = 'INSERT INTO answers(id_q, content, user_id) VALUES ($1, $2, $3);';
    const data = [questionId, content, userId];
    return this.query(query, data);
  }

  findQuestionsWithQuery(title) {
    const query = 'SELECT * FROM questions WHERE title ~ $1;';
    const data = [title];
    return this.query(query, data)
      .then(result => result.rows);
  }

  findQuestion(id) {
    const query = 'SELECT * FROM questions, categories WHERE id = $1 AND categories.id_cat = questions.cat_id;';
    const data = [id];
    return this.query(query, data)
      .then(result => result.rows[0]);
  }

  createQuestion(title, content, image, userId, categoryId) {
    console.log(categoryId);
    const query = 'INSERT INTO questions(title, content, image, user_id, cat_id) VALUES ($1, $2, $3, $4, $5);';
    const data = [title, content, image, userId, categoryId];
    return this.query(query, data);
  }

  deleteQuestion(id) {
    const query = 'DELETE FROM questions WHERE id = $1';
    const data = [id];
    return this.query(query, data);
  }

  findLastQuestions(amount) {
    const query = 'SELECT * FROM questions ORDER BY added_at DESC LIMIT $1;';
    const data = [amount];
    return this.query(query, data)
      .then(result => result.rows);
  }

  findUsersQuestions(userId) {
    const query = 'SELECT * FROM questions WHERE user_id = $1 ORDER BY added_at;';
    const data = [userId];
    return this.query(query, data)
      .then(result => result.rows);
  }

  findQuestionsWithCategory(id) {
    const query = 'SELECT * FROM questions WHERE cat_id = $1';
    const data = [id];
    return this.query(query, data)
      .then(result => result.rows);
  }

  findAllCategories() {
    const query = 'SELECT * FROM categories';
    return this.query(query)
      .then(result => result.rows);
  }

}

export default DatabaseService;
