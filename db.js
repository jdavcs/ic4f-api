const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


module.exports = class DbConnection {
  constructor() {
    this.dbURI = this.getDbURI();
    this.listenToConnEvents();
    this.listenToProcessEnd();
  }

  getDbURI() {
    if (process.env.NODE_ENV === 'production') {
      return process.env.MONGOLAB_URI;
    } else {
      const user = process.env.DB_USERNAME;
      const pass = process.env.DB_PASSWORD;
      let credentials = '';
      if (user == '' || pass == '') {
        credentials = `${user}:${pass}@`;
      }
      const server = process.env.DB_SERVER;
      const port = process.env.DB_PORT;
      const db = process.env.DB_DATABASE;

      return `mongodb://${credentials}${server}:${port}/${db}`;
    }
  }

  connect(callback) {
    mongoose.connect(this.dbURI, {useMongoClient: true,}, callback);
  }

  disconnect(callback) {
    mongoose.disconnect(callback);
  }

  listenToConnEvents() {
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${this.dbURI}`);
    });

    mongoose.connection.on('error', err => {
      console.log('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
  }

  listenToProcessEnd() {
    process.once('SIGUSR2', () => {
      this.shutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    process.on('SIGINT', () => {
      this.shutdown('app termination', () => {
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      this.shutdown('Heroku app shutdown', () => {
        process.exit(0);
      });
    });
  }

  shutdown(msg, callback) {
    mongoose.connection.close( () => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
    });
  };
}
