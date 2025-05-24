const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../utils/db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
  db.run(query, [username, email, password_hash], function (err) {
    if (err) return res.status(400).json({ success: false, error: err.message });
    res.json({ success: true, data: { id: this.lastID } });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, username: user.username }, 'secret_key');
    res.json({ success: true, data: { token } });
  });
});

module.exports = router;
