const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const TestCase = require('../models/testCase');

// Védelem minden endpointon
router.use(authenticateToken);

router.get('/', (req, res) => {
  TestCase.getAll((err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
});

router.get('/:id', (req, res) => {
  TestCase.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (!row) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: row });
  });
});

router.post('/', (req, res) => {
  const testCase = { ...req.body, created_by: req.user.userId };
  TestCase.create(testCase, (err, result) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    res.json({ success: true, data: result });
  });
});

router.put('/:id', (req, res) => {
  TestCase.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    res.json({ success: true, data: result });
  });
});

router.delete('/:id', (req, res) => {
  TestCase.remove(req.params.id, (err, result) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    res.json({ success: true, data: result });
  });
});

module.exports = router;
