const db = require('../utils/db');

const create = (data, callback) => {
  const { title, description, preconditions, priority, status, created_by } = data;
  const sql = `
    INSERT INTO test_cases (title, description, preconditions, priority, status, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [title, description, preconditions, priority, status, created_by];
  db.run(sql, params, function (err) {
    if (err) return callback(err);
    callback(null, { id: this.lastID });
  });
};

const getAll = (callback) => {
  db.all(`SELECT * FROM test_cases`, [], callback);
};

const getById = (id, callback) => {
  db.get(`SELECT * FROM test_cases WHERE id = ?`, [id], callback);
};

const update = (id, data, callback) => {
  const { title, description, preconditions, priority, status } = data;
  const sql = `
    UPDATE test_cases
    SET title = ?, description = ?, preconditions = ?, priority = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  db.run(sql, [title, description, preconditions, priority, status, id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

const remove = (id, callback) => {
  db.run(`DELETE FROM test_cases WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

module.exports = { create, getAll, getById, update, remove };
