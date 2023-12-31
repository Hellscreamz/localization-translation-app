import React, { useState } from 'react';
import axios from 'axios';

import { REACT_APP_PROD_DOWNLOAD_URL, REACT_APP_PROD_UPLOAD_URL } from './utils/urls';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [fileChosen, setFileChosen] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [showReloadButton, setShowReloadButton] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileChosen(true);

        if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
            setFileError(false);
        } else {
            setFileError(true);
            setShowReloadButton(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file || fileError) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(REACT_APP_PROD_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setDownloadLink(url);
            setUploadComplete(true);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDownloadClick = async () => {
        window.location.reload();
        try {
            await axios.get(REACT_APP_PROD_DOWNLOAD_URL);
        } catch (error) {
            console.error('Error deleting JSON file:', error);
        }
    };

    const handleReloadClick = () => {
        setFile(null);
        setFileChosen(false);
        setFileError(false);
        setUploadComplete(false);
        setShowReloadButton(false);
        window.location.reload();
    };

    return (
        <div className="App">
            <h1>Upload Excel File</h1>
            {!uploadComplete ? (
                <form onSubmit={handleSubmit}>
                    {fileChosen ? (
                        !fileError && (
                            <button type="submit" className="upload-button">
                                Upload
                            </button>
                        )
                    ) : (
                        <label htmlFor="file" className="upload-label">
                            Choose a file
                        </label>
                    )}
                    <input type="file" id="file" onChange={handleFileChange} accept=".xlsx" />
                    {fileError && <p className="error-message">Please choose a valid .xlsx file.</p>}
                    {showReloadButton && (
                        <button type="button" className="reload-button" onClick={handleReloadClick}>
                            Reload
                        </button>
                    )}
                </form>
            ) : (
                <div>
                    <h2>Upload complete. Click the link to download the file.</h2>
                    {/* Display download link when available */}
                    {downloadLink && (
                        <div>
                            <h2>Download Translations JSON</h2>
                            <a href={downloadLink} download="translations.json" onClick={handleDownloadClick} className="download-link">
                                Download
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;

