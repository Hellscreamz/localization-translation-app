const XLSX = require('xlsx');
const { validateExcelColumns } = require('../validation/validate-columns-existing');
const { generateUniqueUserId } = require('../helpers/generateUserId');

exports.handleFileUploadHelper = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadedFile = req.file;
        const userSession = req.session;

        if (!userSession.userId) {
            userSession.userId = generateUniqueUserId();
        }

        const workbook = XLSX.read(uploadedFile.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        if (!validateExcelColumns(worksheet)) {
            console.error('Wrong header column names!');
            return res.status(400).json({ error: 'Wrong header column names' });
        }

        const jsonObjectTranslations = XLSX.utils.sheet_to_json(worksheet);

        // Store the JSON data in the user's session
        userSession.jsonData = jsonObjectTranslations;

        res.json(jsonObjectTranslations);
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
