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
    const query = 'INSERT INTO "Users"(username, login, password, email) VALUES ($1, $2, $3, $4);';
    const data = [username, login, password, email];
    return this.query(query, data);
  }

  deleteUser(id) {
    const query = 'DELETE FROM "Users" WHERE id = $1;';
    const data = [id];
    return this.query(query, data);
  }

  updateUser(id) {
    const query = 'UPDATE "Users" SET username=$2, WHERE id = $1';
    const data = [id];
    return this.query(query, data);
  }

  findUser(login) {
    const query = 'SELECT * FROM "Users" WHERE login = $1';
    const data = [login];
    return this.query(query, data)
      .then(result => result.rows[0]);
  }

  findLastQuestions(amount) {
    const query = 'SELECT id, content, added_at FROM Questions ORDER BY added_at DESC LIMIT $1';
    const data = [amount];
    return this.query(query, data);
  }

}

export default DatabaseService;
