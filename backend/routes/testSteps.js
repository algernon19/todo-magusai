const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// GET all steps for a test case
router.get('/:testCaseId/steps', (req, res) => {
  const { testCaseId } = req.params;
  const query = `SELECT * FROM test_steps WHERE test_case_id = ? ORDER BY step_number`;

  db.all(query, [testCaseId], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
});

// POST a new step to a test case
router.post('/:testCaseId/steps', (req, res) => {
  const { testCaseId } = req.params;
  const { action, expected_result } = req.body;

  // Find current max step_number
  const findQuery = `SELECT MAX(step_number) as maxStep FROM test_steps WHERE test_case_id = ?`;

  db.get(findQuery, [testCaseId], (err, row) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const nextStepNumber = (row?.maxStep || 0) + 1;
    const insertQuery = `INSERT INTO test_steps (test_case_id, step_number, action, expected_result) VALUES (?, ?, ?, ?)`;

    db.run(insertQuery, [testCaseId, nextStepNumber, action, expected_result], function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, data: { id: this.lastID, step_number: nextStepNumber } });
    });
  });
});

// PUT update a step
router.put('/step/:id', (req, res) => {
  const { id } = req.params;
  const { action, expected_result } = req.body;

  const query = `UPDATE test_steps SET action = ?, expected_result = ? WHERE id = ?`;

  db.run(query, [action, expected_result, id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: { updated: this.changes } });
  });
});

// DELETE a step
router.delete('/step/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM test_steps WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: { deleted: this.changes } });
  });
});

module.exports = router;
