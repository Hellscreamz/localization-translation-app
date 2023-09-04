const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');

const { sessionOptions, corsOptions} = require('../config/server-config')
const { FileUpload } = require('../controllers/Upload');
const { FileDownload } = require('../controllers/Download');

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(session(sessionOptions));
app.use(cors(corsOptions));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.post('/upload', upload.single('file'), FileUpload);

app.get('/download-json', FileDownload);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
