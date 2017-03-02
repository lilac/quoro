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
}

export default DatabaseService;
