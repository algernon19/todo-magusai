const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/app.db');
const initSqlPath = path.join(__dirname, '../database/init.sql');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB connection error:', err.message);
    return;
  }
  console.log('Connected to SQLite database.');

  // Adatbázis inicializálása init.sql alapján
  const initSql = fs.readFileSync(initSqlPath, 'utf8');
  db.exec(initSql, (err) => {
    if (err) console.error('Error executing init.sql:', err.message);
    else console.log('Database schema initialized.');
  });
});

module.exports = db;
