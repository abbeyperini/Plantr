require('dotenv').config()
const DATABASE_PASS = process.env.DATABASE_PASS;

module.exports = {
  "development": {
    "username": "edwyzknr",
    "password": DATABASE_PASS,
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
    "password": DATABASE_PASS,
    "database": "edwyzknr",
    "host": "lallah.db.elephantsql.com",
    "dialect": "postgres"
  }
}
