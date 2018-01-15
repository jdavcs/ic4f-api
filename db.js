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
      return 'something else'; //TODO
    } else {
      return 'mongodb://localhost/ic4f';
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
