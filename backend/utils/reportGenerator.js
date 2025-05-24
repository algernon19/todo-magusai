const db = require('./db');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { create } = require('xmlbuilder2');

function ensureReportsDir() {
  const reportsDir = path.join(__dirname, '../../reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
}

function generateExcel(callback) {
  const query = `
    SELECT tc.id, tc.title, tc.description, te.status, te.actual_result
    FROM test_cases tc
    LEFT JOIN test_executions te ON tc.id = te.test_case_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return callback(err);

    ensureReportsDir();

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'TestReport');

    const filePath = path.join(__dirname, '../../reports/test-report.xlsx');
    xlsx.writeFile(workbook, filePath);

    callback(null, filePath);
  });
}

function generateXml(callback) {
  const query = `
    SELECT tc.id, tc.title, tc.description, te.status, te.actual_result
    FROM test_cases tc
    LEFT JOIN test_executions te ON tc.id = te.test_case_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return callback(err);

    ensureReportsDir();

    const root = create({ version: '1.0' }).ele('TestReport');
    rows.forEach(row => {
      const tc = root.ele('TestCase');
      tc.ele('ID').txt(row.id);
      tc.ele('Title').txt(row.title);
      tc.ele('Description').txt(row.description || '');
      tc.ele('Status').txt(row.status || 'not_executed');
      tc.ele('Result').txt(row.actual_result || '');
    });

    const xml = root.end({ prettyPrint: true });
    const filePath = path.join(__dirname, '../../reports/test-report.xml');
    fs.writeFileSync(filePath, xml);

    callback(null, filePath);
  });
}

module.exports = { generateExcel, generateXml };
