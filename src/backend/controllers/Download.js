const downloadHelper = require('../helpers/downloadHelper');

exports.FileDownload = (req, res) => {
    downloadHelper.handleFileDownload(req, res);
};
