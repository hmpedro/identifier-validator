const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__filename, '../../.env') });
}

class Env {
  static get NODE_ENV() {
    return process.env.NODE_ENV || 'development';
  }

  static get MONGO_URL() {
    return process.env.MONGO_URL || 'mongodb://teste:1234567@localhost:27017/identifier-project';
  }

  static get PORT() {
    return process.env.PORT || 3000;
  }
}

module.exports = Env;
