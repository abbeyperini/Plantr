const secrets = require('../secrets')

module.exports = {
  "development": {
    "username": "edwyzknr",
    "password": secrets,
    "database": "edwyzknr",
    "host": "lallah.db.elephantsql.com",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "edwyzknr",
    "password": secrets,
    "database": "edwyzknr",
    "host": "lallah.db.elephantsql.com",
    "dialect": "postgres"
  }
}
