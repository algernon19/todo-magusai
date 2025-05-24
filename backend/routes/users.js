const express = require('express');
const router = express.Router();
const db = require('../utils/db');

/* GET users listing. */
router.get('/', function (req, res) {
  const query = `SELECT id, username, email, role, created_at FROM users`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, data: rows });
  });
});

module.exports = router;
