const express = require('express');
const router = express.Router();
const db = require('../utils/db');

/**
 * POST /api/executions
 * Új tesztfutás rögzítése
 * Elvárt body:
 * {
 *   test_case_id: number,
 *   status: 'pass' | 'fail' | 'blocked' | 'not_executed',
 *   actual_result: string,
 *   comments?: string
 * }
 */
router.post('/', (req, res) => {
  const { test_case_id, status, actual_result, comments } = req.body;
  const executed_by = req.user.userId; // JWT-ből

  const query = `
    INSERT INTO test_executions (test_case_id, executed_by, status, actual_result, comments)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [test_case_id, executed_by, status, actual_result, comments], function (err) {
    if (err) {
      console.error('Insert execution error:', err.message);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, data: { id: this.lastID } });
  });
});

/**
 * GET /api/executions/:testcaseId
 * Adott teszteset összes végrehajtása
 */
router.get('/:testcaseId', (req, res) => {
  const { testcaseId } = req.params;

  const query = `
    SELECT e.*, u.username FROM test_executions e
    JOIN users u ON e.executed_by = u.id
    WHERE e.test_case_id = ?
    ORDER BY e.executed_at DESC
  `;

  db.all(query, [testcaseId], (err, rows) => {
    if (err) {
      console.error('Get execution error:', err.message);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, data: rows });
  });
});

module.exports = router;
