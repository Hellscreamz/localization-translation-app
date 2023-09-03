// validation.js
const XLSX = require('xlsx');

const expectedColumns = ['section', 'placeholder', 'untranslated', 'translated'];

function validateExcelColumns(worksheet) {
    const sheetColumns = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
    const missingColumns = expectedColumns.filter(column => !sheetColumns.includes(column));

    return missingColumns.length === 0;
}

module.exports = {
    validateExcelColumns
};
