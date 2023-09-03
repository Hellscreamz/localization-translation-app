const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const XLSX = require('xlsx');
const { spawn } = require('child_process');
const { validateExcelColumns } = require('../validation/validate-columns-existing.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFile = req.file;
    const filePath = path.join(__dirname, '../upload', uploadedFile.originalname);
    const workbook = XLSX.read(uploadedFile.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!validateExcelColumns(worksheet)) {
        console.error('Wrong header column names!');
        return res.status(400).json({ error: 'Wrong header column names' });
    }

    try {
        await fs.promises.writeFile(filePath, uploadedFile.buffer);
    } catch (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).json({ error: 'Error writing file to disk' });
    }

    const scriptPath = path.join(__dirname, '../scripts/generate-translations.js');
    const childProcess = spawn('node', [scriptPath]);

    childProcess.on('close', async (code) => {
        if (code === 0) {
            const jsonFilePath = path.join(__dirname, '../download/output.json');
            res.download(jsonFilePath, 'translations.json', async (downloadErr) => {
                if (downloadErr) {
                    console.error('Error sending file:', downloadErr);
                    res.status(500).json({ error: 'Error sending file to client' });
                }

                try {
                    await fs.promises.unlink(filePath);
                } catch (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            });
        } else {
            res.status(500).json({ error: 'Script execution failed' });
        }
    });
});

app.get('/delete-json', (req, res) => {
    const jsonFilePath = path.join(__dirname, '../download', 'output.json');

    fs.unlink(jsonFilePath, (err) => {
        if (err) {
            console.error('Error deleting JSON file:', err);
            return res.status(500).json({ error: 'Error deleting JSON file' });
        }

        res.status(200).json({ message: 'JSON file deleted successfully' });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
