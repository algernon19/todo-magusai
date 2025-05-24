const express = require('express');
const router = express.Router();
const { generateExcel, generateXml } = require('../utils/reportGenerator');
const path = require('path');

router.get('/excel', (req, res) => {
  generateExcel((err, filePath) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.download(filePath);
  });
});

router.get('/xml', (req, res) => {
  generateXml((err, filePath) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.download(filePath);
  });
});

module.exports = router;
