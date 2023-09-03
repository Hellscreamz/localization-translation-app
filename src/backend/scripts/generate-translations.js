const XLSX = require('xlsx');
const fs = require('fs');
const { validateExcelColumns } = require('../validation/validate-columns-existing');
const path = require('path');

const uploadDirectory = 'src/backend/upload';

const xlsxFiles = fs.readdirSync(uploadDirectory).filter(file => path.extname(file) === '.xlsx');

    const xlsxFile = xlsxFiles[0];
    const workbook = XLSX.readFile(path.join(uploadDirectory, xlsxFile));

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!validateExcelColumns(worksheet)) {
        console.error(`Wrong header column names in file: ${xlsxFile}`);
    } else {
        let jsonObjectTranslations = [];

        XLSX.utils.sheet_to_json(worksheet).forEach(row => {
            jsonObjectTranslations.push({
                section: row.section,
                placeholder: row.placeholder,
                untranslated: row.untranslated,
                translated: row.translated
            });
        });

        fs.writeFileSync('src/backend/download/output.json', JSON.stringify(jsonObjectTranslations, null, 2));
        console.log(`Processed file: ${xlsxFile}`);
};
