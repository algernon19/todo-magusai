const express = require('express');
const router = express.Router();
const { generateExcel, generateXml } = require('../utils/reportGenerator');

router.get('/testcases/xml', (req, res) => {
  generateXml((err, filePath) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.download(filePath, 'tesztesetek.xml');
  });
});

router.get('/testcases/excel', (req, res) => {
  generateExcel((err, filePath) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.download(filePath, 'tesztesetek.xlsx');
  });
});

module.exports = router;
