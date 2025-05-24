const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../database/app.db'), err => {
  if (err) console.error('DB connection error:', err.message);
});

module.exports = db;
